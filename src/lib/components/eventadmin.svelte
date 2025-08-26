<script>
  import { page } from '$app/stores';
  import { onMount, tick } from "svelte";
  import { enhance, applyAction } from '$app/forms';
  import { goto } from '$app/navigation';
  import { Toaster, toast } from "svelte-sonner";
  import Icon from "@iconify/svelte";
  	// import { sendMessage } from "$lib/utils.js";

let PUBLIC_COMPBUY_IMAGE_PATH = "Digitoad"
  let selectedwebsite = "Digitoad";
  let open = false;
  	let recorded = [];
//   async function sendToServerreport() {

//   if (selectedwebsite === "Digitoad") {
//       open = false;
//       return;
//     }
//     open = true;
//     const formdata = new FormData();
// formdata.append("website",selectedwebsite);
//     try {
//       const res = await sendMessage(`?/newsData`, formdata, async result => {
//         // console.log("Server response:", result.data.records);
//         recorded = result.data.records;
//       });
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   }

	export let data;

	$: ({ records, totalCount, news } = data);
  // let records = records;
  // let totalCount = data?.data?.totalCount;
  let headers = ['Title', 'Event Date' ,'Timing','Short Description', 'PreviewText', 'Image', 'Action'];

  let file;
  let previewUrl = '';
  let form;
  let filename;
  let showModal = false;
  let showModalshort = false;
  let selectedItem = null;

  let searchQuery = $page.url.searchParams.get("search") || '';

  let editor;
  let editorContainer;
  let Quill;
  let previewTextContent = '';
  let editorInitialized = false;
  let previewTextWordCount = 0;
  let previewTextError = '';
  let titleError = '';
  let existingTitles = [];
  let imageUploaded = false;
  let imageSelected = false;
  let imageError = '';

  let originalEditData = {};
  let hasChanges = false;
  let shortDescriptionContent = '';
  let shortDescriptionWordCount = 0;
  let shortDescriptionError = '';
let startDate = '';
let endDate = '';
let startTime = '';
let endTime = '';
let dateTimeError = '';
const today = new Date().toISOString().split('T')[0];
function validateDateTime() {
  dateTimeError = '';
  
  if (!startDate) {
    dateTimeError = 'Start date is required.';
    return false;
  }
  
  if (!endDate) {
    dateTimeError = 'End date is required.';
    return false;
  }
  
  if (!startTime) {
    dateTimeError = 'Start time is required.';
    return false;
  }
  
  if (!endTime) {
    dateTimeError = 'End time is required.';
    return false;
  }
  
  // Check if start date is not in the past
  const selectedStartDate = new Date(startDate);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time for date comparison
  
  if (selectedStartDate < currentDate) {
    dateTimeError = 'Start date cannot be in the past.';
    return false;
  }
  
  // Check if end date is not before start date
  const selectedEndDate = new Date(endDate);
  if (selectedEndDate < selectedStartDate) {
    dateTimeError = 'End date cannot be before start date.';
    return false;
  }
  
  // If same date, check time logic
  if (startDate === endDate) {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    if (endDateTime <= startDateTime) {
      dateTimeError = 'End time must be after start time when dates are the same.';
      return false;
    }
    
    // Check minimum duration (optional - 1 hour minimum)
    const timeDiff = endDateTime - startDateTime;
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    if (timeDiff < oneHour) {
      dateTimeError = 'Minimum duration should be 1 hour.';
      return false;
    }
  }
  
  return true;
}

function handleStartDateChange(event) {
  startDate = event.target.value;
  
  // Auto-update end date if it's before start date
  if (endDate && endDate < startDate) {
    endDate = startDate;
  }
  
  validateDateTime();
  
  if (editModalOpen) {
    checkForChanges();
  }
}

function handleEndDateChange(event) {
  endDate = event.target.value;
  validateDateTime();
  
  if (editModalOpen) {
    checkForChanges();
  }
}

function handleStartTimeChange(event) {
  startTime = event.target.value;
  validateDateTime();
  
  if (editModalOpen) {
    checkForChanges();
  }
}

function handleEndTimeChange(event) {
  endTime = event.target.value;
  validateDateTime();
  
  if (editModalOpen) {
    checkForChanges();
  }
}
  $: currentPage = parseInt($page.url.searchParams.get("page")) || 1
  $: totalPages = isNaN(totalCount) ? 1 : Math.ceil(totalCount/10)
  $: {
    if (itemToEdit) {
      itemToEdit.Keyword = keywordsList.join(', ');
    }
  }
  $: isKeywordInputEmpty = !keywordInput || keywordInput.trim() === '';

  $: if (editModalOpen && itemToEdit) {
    checkForChanges();
  }
  
  $: if (editModalOpen && previewTextContent !== undefined) { 
    checkForChanges();
  }


  onMount(async () => {
    try {

      if (records) {
        existingTitles = records.map(record => record.title.toLowerCase());
      }

        if (news.records) {
        existingTitles = news.records.map(record => record.title.toLowerCase());
      }

      const quillModule = await import("quill");
      await import("quill/dist/quill.snow.css");
      Quill = quillModule.default;
      await tick();
    } catch (error) {
      console.error("Error loading Quill:", error);
      toast.error("Failed to load text editor");
    }
  });

  async function initEditor() {
    if (!Quill) return;
    
    await tick();
    
    if (editor) {
      editor = null;
      editorInitialized = false;
      if (editorContainer) {
        editorContainer.innerHTML = '';
      }
    }
    
    if (editorContainer && !editorInitialized) {
      try {
        editor = new Quill(editorContainer, {
          theme: "snow",
          placeholder: "Write your blog previewText...",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              [{ color: [] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "blockquote", "code-block", "image"],
              [{ align: [] }],
              ["clean"],
            ],
          },
        });
        
        //   editor.getModule('toolbar').addHandler('image', function() {
        //   const input = document.createElement('input');
        //   input.setAttribute('type', 'file');
        //   input.setAttribute('accept', 'image/*');
        //   input.click();

        //   input.onchange = () => {
        //     const file = input.files[0];
        //     if (file) {
        //       if (file.size > 2 * 1024 * 1024) {
        //         toast.error('Image size must be less than 2MB');
        //         return;
        //       }
              
        //       if (!file.type.startsWith('image/')) {
        //         toast.error('Please select a valid image file');
        //         return;
        //       }

        //       const reader = new FileReader();
        //       reader.onload = (e) => {
        //         const range = editor.getSelection();
        //         if (range) {
        //           const imageUrl = e.target.result;
        //           editor.insertEmbed(range.index, 'image', imageUrl);
                  
        //           setTimeout(() => {
        //             const images = editor.container.querySelectorAll('img');
        //             const lastImage = images[images.length - 1];
        //             if (lastImage) {
        //               lastImage.style.maxWidth = '100%';
        //               lastImage.style.height = 'auto';
        //               lastImage.onclick = () => showImageAlignmentOptions(lastImage);
        //             }
        //           }, 100);
        //         }
        //       };
        //       reader.readAsDataURL(file);
        //     }
        //   };
        // });
        editor.getModule('toolbar').addHandler('image', function() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be less than 2MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      try {
        // Convert to base64 for embedding in editor
        const base64String = await convertFileToBase64(file);
        const imageUrl = `data:${file.type};base64,${base64String}`;
        
        const range = editor.getSelection();
        if (range) {
          editor.insertEmbed(range.index, 'image', imageUrl);
          
          setTimeout(() => {
            const images = editor.container.querySelectorAll('img');
            const lastImage = images[images.length - 1];
            if (lastImage) {
              lastImage.style.maxWidth = '100%';
              lastImage.style.height = 'auto';
              lastImage.onclick = () => showImageAlignmentOptions(lastImage);
            }
          }, 100);
        }
      } catch (error) {
        console.error('Image processing error:', error);
        toast.error('Failed to process image');
      }
    }
  };
});
        editor.on("text-change", () => {
          previewTextContent = editor.root.innerHTML;
          updateWordCount();
          if (editModalOpen) {
            checkForChanges();
          }
        });
        
        editorInitialized = true;
      } catch (error) {
        console.error("Error initializing editor:", error);
        toast.error("Failed to initialize text editor");
      }
    }
  }

  let showAlignmentModal = false;
  let alignmentImage = null;
  let selectedAlignment = 'left';

  function showImageAlignmentOptions(img) {
    alignmentImage = img;
    const currentAlign = img.style.textAlign || img.parentElement.style.textAlign || 'left';
    selectedAlignment = currentAlign;
    showAlignmentModal = true;
  }

  function applyImageAlignment() {
  if (alignmentImage && selectedAlignment) {
    alignmentImage.style.display = 'block';
    alignmentImage.style.margin = '0';
    alignmentImage.parentElement.style.textAlign = '';
    
    if (selectedAlignment === 'center') {
      alignmentImage.style.margin = '0 auto';
      alignmentImage.style.display = 'block';
    } else if (selectedAlignment === 'right') {
      alignmentImage.parentElement.style.textAlign = 'right';
    } else if (selectedAlignment === 'left') {
      alignmentImage.parentElement.style.textAlign = 'left';
    }
    
    if (editor) {
      previewTextContent = editor.root.innerHTML;
      if (editModalOpen) {
        checkForChanges();
      }
    }
  }
  closeAlignmentModal();
}

  function closeAlignmentModal() {
  showAlignmentModal = false;
  alignmentImage = null;
  }

  function updateWordCount() {
    if (!previewTextContent) {
      previewTextWordCount = 0;
      return;
    }

    const textOnly = previewTextContent.replace(/<[^>]*>/g, ' ').trim();
    const words = textOnly.split(/\s+/).filter(word => word.length > 0);
    previewTextWordCount = words.length;

    if (previewTextWordCount < 200) {
      previewTextError = `Please add more content. Minimum 200 words required (current: ${previewTextWordCount})`;
    } else {
      previewTextError = '';
    }
  }

  function setEditorContent(content) {
    if (editor && content) {
      editor.root.innerHTML = content.trim();
      previewTextContent = content.trim();
      updateWordCount();
    } else if (editor) {
      editor.setText('');
      previewTextContent = '';
      previewTextWordCount = 0;
    }
  }

  function checkDuplicateTitle(newTitle, currentId = null) {
    if (!newTitle) return false;
    
    const normalizedTitle = newTitle.trim().toLowerCase();
    
    if (!normalizedTitle || !/\S/.test(normalizedTitle)) return false;
    
if (currentId) {
  let otherTitles = records
    .filter(item => item._id !== currentId)
    .map(item => item.title.trim().toLowerCase());

  // Fallback to records.news if no results found in records
  if (!otherTitles.length && news.records) {
    otherTitles = news.records
      .filter(item => item._id !== currentId)
      .map(item => item.title.trim().toLowerCase());
  }

  return otherTitles.includes(normalizedTitle);
}

  
    return existingTitles.map(title => title.trim()).includes(normalizedTitle);
  }

  let searchTimeout;

  const handleSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('page');
      newUrl.searchParams.delete('filter');
      
      if (searchQuery && searchQuery.trim() !== '') {
        newUrl.searchParams.set('search', searchQuery.trim());
      } else {
        newUrl.searchParams.delete('search');
      }
      
      goto(newUrl.toString(), {
          invalidateAll: true,
          replaceState: true,
          keepfocus: true,
          noScroll: true
      });
    }, 500);
  };

  function truncateText(text, maxLength) {
    if (!text) return ''; 
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  const clearSearch = () => {
    searchQuery = '';
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('search');
    goto(newUrl.toString(), {
      invalidateAll: true,
      replaceState: true,
      keepfocus: true,
      noScroll: true
    });
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    const newUrl = new URL(window.location.href);
    if (currentPage === 1) {
			newUrl.searchParams.delete('page');
		} else {
			newUrl.searchParams.set('page', currentPage);
		}
    
    goto(newUrl.toString(), {
      replaceState: true,
      keepfocus: true,
      noScroll: true
    });
  };

  let createModalOpen = false;
  let editModalOpen = false;
  let deleteModalOpen = false;
  let itemToEdit = null;
  let itemToDelete = null;

  let title = ''; 
  let newsLink = '';
  let Keyword = '';
  let keywordInput = '';
  let keywordsList = [];

  async function openCreateModal() {
    title = '';
    keywordInput = '';
    newsLink = '';
    file = null;
    previewUrl = '';
    filename = '';
    keywordsList = [];
    previewTextContent = '';
    previewTextWordCount = 0;
    previewTextError = '';
    titleError = '';
    imageSelected = false;
    imageUploaded = false;
    imageError = '';
      startDate = '';
  endDate = '';
  startTime = '';
  endTime = '';
  dateTimeError = '';
    createModalOpen = true;
    
    await tick();
    await initEditor();
    setEditorContent('');
  }

  function closeCreateModal() {
    createModalOpen = false;
  }

  async function openEditModal(item) {
    if (!item) return;
    
    try {
      itemToEdit = { ...item };
      titleError = '';

      shortDescriptionContent = itemToEdit.shortDescription || '';
      updateShortDescriptionWordCount();
      shortDescriptionError = '';
       startDate = itemToEdit.startDate || '';
    endDate = itemToEdit.endDate || '';
    startTime = itemToEdit.startTime || '';
    endTime = itemToEdit.endTime || '';
    dateTimeError = '';
    //   originalEditData = {
    //     title: (itemToEdit.title || '').trim(),
    //     Keyword: itemToEdit.Keyword || '',
    //     previewText: (itemToEdit.previewText || '').trim(),
    //     shortDescription: (itemToEdit.shortDescription || '').trim()
        
    //   };
     originalEditData = {
      title: (itemToEdit.title || '').trim(),
    //   Keyword: itemToEdit.Keyword || '',
      previewText: (itemToEdit.previewText || '').trim(),
      shortDescription: (itemToEdit.shortDescription || '').trim(),
      startDate: itemToEdit.startDate || '',
      endDate: itemToEdit.endDate || '',
      startTime: itemToEdit.startTime || '',
      endTime: itemToEdit.endTime || ''
    };
      hasChanges = false;
      
    //   keywordsList = itemToEdit.Keyword 
    //     ? itemToEdit.Keyword.split(',').map(k => k.trim())
    //     : [];
      
      editModalOpen = true;
      
      await tick();
      await initEditor();
      
      await tick();
      setEditorContent(itemToEdit.previewText || '');

      setTimeout(() => {
      checkForChanges();
      }, 100);
    } catch (error) {
      console.error("Error opening edit modal:", error);
      toast.error("Failed to open edit form");
    }
  }

  function closeEditModal() {
    editModalOpen = false;
    itemToEdit = null;
    keywordsList = [];
    previewTextError = '';
    titleError = '';
    shortDescriptionError = '';
    shortDescriptionContent = ''; 
    shortDescriptionWordCount = 0; 
    hasChanges = false;
    originalEditData = {};
  }

  function updateShortDescriptionWordCount() {
  if (!shortDescriptionContent) {
    shortDescriptionWordCount = 0;
    return;
  }

  const textOnly = shortDescriptionContent.replace(/<[^>]*>/g, ' ').trim();
  const words = textOnly.split(/\s+/).filter(word => word.length > 0);
  shortDescriptionWordCount = words.length;

  if (shortDescriptionWordCount < 100) {
    shortDescriptionError = `Please add more content. Minimum 100 words required for SEO (current: ${shortDescriptionWordCount})`;
  } else {
    shortDescriptionError = '';
  }
}

function handleShortDescriptionInput(event) {
  let value = event.target.value;

  value = value.replace(/^\s+/, '');

  value = value.replace(/\s{2,}/g, ' ');

  event.target.value = value;
  
  shortDescriptionContent = value;
  updateShortDescriptionWordCount();
  if (editModalOpen) {
    checkForChanges();
  }
}

function handleShortDescriptionBlur(event) {
  const trimmedValue = event.target.value.trim();
  event.target.value = trimmedValue;
  shortDescriptionContent = trimmedValue;
  updateShortDescriptionWordCount();
  if (editModalOpen) {
    checkForChanges();
  }
}

//   function checkForChanges() {
//     if (!originalEditData || !itemToEdit) {
//       hasChanges = false;
//       return;
//     }

//     const currentKeywords = keywordsList.join(', ');
//     const originalKeywords = originalEditData.Keyword || '';

//     const currentPreviewText = (previewTextContent || '').trim();
//     const originalPreviewText = (originalEditData.previewText || '').trim();

//     const currentShortDesc = (shortDescriptionContent || '').trim();
//     const originalShortDesc = (originalEditData.shortDescription || '').trim();
  
    
//     hasChanges = (
//       itemToEdit.title.trim() !== originalEditData.title.trim() ||
//       currentKeywords !== originalKeywords ||
//       currentPreviewText !== originalPreviewText || 
//       currentShortDesc !== originalShortDesc
//     );
//   }
function checkForChanges() {
  if (!originalEditData || !itemToEdit) {
    hasChanges = false;
    return;
  }

  const currentKeywords = keywordsList.join(', ');
  const originalKeywords = originalEditData.Keyword || '';

  const currentPreviewText = (previewTextContent || '').trim();
  const originalPreviewText = (originalEditData.previewText || '').trim();

  const currentShortDesc = (shortDescriptionContent || '').trim();
  const originalShortDesc = (originalEditData.shortDescription || '').trim();

  hasChanges = (
    itemToEdit.title.trim() !== originalEditData.title.trim() ||
    currentKeywords !== originalKeywords ||
    currentPreviewText !== originalPreviewText || 
    currentShortDesc !== originalShortDesc ||
    startDate !== (originalEditData.startDate || '') ||
    endDate !== (originalEditData.endDate || '') ||
    startTime !== (originalEditData.startTime || '') ||
    endTime !== (originalEditData.endTime || '')
  );
}
  function openDeleteModal(row) {
    itemToDelete = row;
    deleteModalOpen = true;
  }

  function closeDeleteModal() {
    deleteModalOpen = false;
    itemToDelete = null;
  }
function handleFileChange(event) {
  file = event.target.files[0];
  if (file) {
    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      imageError = 'Image size must be less than 2MB';
      imageSelected = false;
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      imageError = 'Please select a valid image file';
      imageSelected = false;
      return;
    }

    filename = file.name.trim();
    filename = filename.replace(/\s?\(\d+\)\./, '.')
                     .replace(/[\\\/:*?"<>|()]/g, '-')
                     .replace(/[^a-zA-Z0-9.-]/g, '-') 
                     .replace(/-+/g, '-')
                     .replace(/^-+/, '')
                     .replace(/-+$/, '');

    // Create preview URL
    previewUrl = URL.createObjectURL(file);
    imageSelected = true;
    imageUploaded = false;
    imageError = '';
  }
}
// async function uploadImage() {
//   if (!file) {
//     toast.warning('Please select a file first.');
//     return;
//   }

//   try {
//     // Convert file to base64
//     const base64String = await convertFileToBase64(file);
    
//     // Store the base64 data for form submission
//     window.uploadedImageData = {
//       base64: base64String,
//       filename: filename,
//       mimeType: file.type
//     };
    
//     imageUploaded = true;
//     imageError = '';
//     toast.success('Image processed successfully!');
    
//   } catch (error) {
//     console.error('Image processing error:', error);
//     toast.error('Failed to process image. Please try again.');
//     imageUploaded = false;
//     imageError = 'Failed to process image';
//   }
// }
async function uploadImage() {
  if (!file) {
    toast.warning('Please select a file first.');
    return;
  }

  try {
    // Just mark as uploaded - the actual processing will happen on form submission
    imageUploaded = true;
    imageError = '';
    toast.success('Image ready for upload!');
    
  } catch (error) {
    console.error('Image processing error:', error);
    toast.error('Failed to process image. Please try again.');
    imageUploaded = false;
    imageError = 'Failed to process image';
  }
}
function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Remove the data:image/type;base64, prefix to get only the base64 string
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
//   function handleFileChange(event) {
//     file = event.target.files[0];
//     if (file) {
//       filename = file.name.trim();
//       filename = filename.replace(/\s?\(\d+\)\./, '.')
//                          .replace(/[\\\/:*?"<>|()]/g, '-')
//                          .replace(/[^a-zA-Z0-9.-]/g, '-') 
//                          .replace(/-+/g, '-')
//                          .replace(/^-+/, '')
//                          .replace(/-+$/, '');

//       previewUrl = URL.createObjectURL(file);
//       imageSelected = true;
//       imageUploaded = false;
//       imageError = '';
//     }
//   }
  
//   async function uploadImage() {
//     if (!file) {
//       toast.warning('Please select a file first.');
//       return;
//     }
   
//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('filename', filename);
   
//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData
//       });
     
//       const result = await response.json();
     
//       if (response.ok) {
//         // toast.success(result.message || 'Upload successful!');
//         imageUploaded = true;
//         imageError = '';
//       } else {
//         toast.error(result.message || 'Upload failed. Please try again.');
//         imageUploaded = false;
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       toast.error('An error occurred while uploading the image.');
//       imageUploaded = false;
//     }
//   }
//   async function uploadImage() {
//   if (!file) {
//     toast.warning('Please select a file first.');
//     return;
//   }
 
//   const formData = new FormData();
//   formData.append('image', file);
//   formData.append('filename', filename);

  
//   console.log('FormData prepared with:', {
//     image: file,
//     filename: filename
//   });
  
//   // Set success state directly for now
//   imageUploaded = true;
//   imageError = '';
// }

//   function validateForm() {
//     let isValid = true;

//     if (createModalOpen) {
//       const trimmedTitle = title ? title.trim() : '';
//       if (!trimmedTitle || trimmedTitle.length === 0) {
//         titleError = 'Title is required and must contain at least one word.';
//         isValid = false;
//       } else if (checkDuplicateTitle(trimmedTitle)) {
//         titleError = 'This title is already in use. Please modify it to make it unique.';
//         isValid = false;
//       } else {
//         titleError = '';
//         title = trimmedTitle; 
//       }

//       if (imageSelected && !imageUploaded) {
//         imageError = 'Please click Upload button to submit/update the image.';
//         isValid = false;
//       } else {
//         imageError = '';
//       }
//     } else if (editModalOpen && itemToEdit) {
//       const trimmedTitle = itemToEdit.title ? itemToEdit.title.trim() : '';
//       if (!trimmedTitle || trimmedTitle.length === 0) {
//         titleError = 'Title is required and must contain at least one word.';
//         isValid = false;
//       } else if (checkDuplicateTitle(trimmedTitle, itemToEdit._id)) {
//         titleError = 'This title is already in use. Please modify it to make it unique.';
//         isValid = false;
//       } else {
//         titleError = '';
//         itemToEdit.title = trimmedTitle;
//       }

//       if (imageSelected && !imageUploaded) {
//         imageError = 'Please click Upload button to submit/update the image.';
//         isValid = false;
//       } else {
//         imageError = '';
//       }

//       if (shortDescriptionContent) {
//       shortDescriptionContent = shortDescriptionContent.trim();
//     }
//         updateShortDescriptionWordCount();
//     if (shortDescriptionWordCount < 100) {
//       isValid = false;
//     }

//     }

//     if (keywordsList.length === 0) {
//       toast.warning('Please add at least one keyword');
//       isValid = false;
//     }

//     if (editor && previewTextContent) {
//       const trimmedContent = previewTextContent.trim();
//       if (trimmedContent !== previewTextContent) {
//         editor.root.innerHTML = trimmedContent;
//         previewTextContent = trimmedContent;
//       }
//     }

//     updateWordCount();
//     if (previewTextWordCount < 200) {
//       isValid = false;
//   }
  
//   return isValid;
//   }
function validateForm() {
  let isValid = true;

  if (createModalOpen) {
    const trimmedTitle = title ? title.trim() : '';
    if (!trimmedTitle || trimmedTitle.length === 0) {
      titleError = 'Title is required and must contain at least one word.';
      isValid = false;
    } else if (checkDuplicateTitle(trimmedTitle)) {
      titleError = 'This title is already in use. Please modify it to make it unique.';
      isValid = false;
    } else {
      titleError = '';
      title = trimmedTitle; 
    }

    if (imageSelected && !imageUploaded) {
      imageError = 'Please click Upload button to submit/update the image.';
      isValid = false;
    } else {
      imageError = '';
    }
  } else if (editModalOpen && itemToEdit) {
    const trimmedTitle = itemToEdit.title ? itemToEdit.title.trim() : '';
    if (!trimmedTitle || trimmedTitle.length === 0) {
      titleError = 'Title is required and must contain at least one word.';
      isValid = false;
    } else if (checkDuplicateTitle(trimmedTitle, itemToEdit._id)) {
      titleError = 'This title is already in use. Please modify it to make it unique.';
      isValid = false;
    } else {
      titleError = '';
      itemToEdit.title = trimmedTitle;
    }

    if (imageSelected && !imageUploaded) {
      imageError = 'Please click Upload button to submit/update the image.';
      isValid = false;
    } else {
      imageError = '';
    }

    if (shortDescriptionContent) {
      shortDescriptionContent = shortDescriptionContent.trim();
    }
    updateShortDescriptionWordCount();
    if (shortDescriptionWordCount < 100) {
      isValid = false;
    }
  }

//   if (keywordsList.length === 0) {
//     toast.warning('Please add at least one keyword');
//     isValid = false;
//   }

  if (editor && previewTextContent) {
    const trimmedContent = previewTextContent.trim();
    if (trimmedContent !== previewTextContent) {
      editor.root.innerHTML = trimmedContent;
      previewTextContent = trimmedContent;
    }
  }

  updateWordCount();
  if (previewTextWordCount < 200) {
    isValid = false;
  }

  // Validate date and time
  if (!validateDateTime()) {
    isValid = false;
  }
  
  return isValid;
}

  function handleSubmit() {
    if (!form) {
      toast.error('Form not accessible');
      return;
    }

    if (createModalOpen) {
      title = title.trim();
    } else if (editModalOpen && itemToEdit) {
      itemToEdit.title = itemToEdit.title.trim();
    }

    if (!validateForm()) {
      return;
    }

    if (editor) {
      previewTextContent = editor.root.innerHTML.trim();
    }

    form.requestSubmit();
  }

  function openModalInfo(item) {
    showModal = true;
    selectedItem = item;
  }


  function closeModalInfo() {
    showModal = false;
    selectedItem = null;
  }

    function openModalshort(item) {
    showModalshort = true;
    selectedItem = item;
  }


  function closeModalshort() {
    showModalshort = false;
    selectedItem = null;
  }

  let showKeywordsModal = false;
  let selectedItemKeywords = [];

  function openKeywordsModal(item) {
    selectedItemKeywords = item.Keyword ? 
      (typeof item.Keyword === 'string' ? item.Keyword.split(',').map(k => k.trim()) : item.Keyword) 
      : [];
    showKeywordsModal = true;
  }

  function closeKeywordsModal() {
    showKeywordsModal = false;
  }

  function generateNewsLink(title) {
    if (!title) return '';
    return title
      .toLowerCase() 
      .replace(/[^a-z0-9\s-]/g, '')  
      .replace(/\s+/g, '-')  
      .replace(/-+/g, '-')  
      .replace(/-$/, ''); 
  }

  function handleTitleChange(e) {
    let value = e.target.value;

    value = value.replace(/^\s+/, '');

    value = value.replace(/\s{3,}/g, '  ');

    const trimmedValue = value.replace(/\s+$/, '');

    e.target.value = value;

    const wordArray = trimmedValue.split(/\s+/).filter(word => word.length > 0);

    const wordCount = wordArray.length;
    const firstWord = wordArray[0] || '';
    const firstWordValidStart = /^[a-zA-Z0-9]/.test(firstWord);

    const shouldCheckFirstWordLength = wordCount <= 2;

    if (createModalOpen) {
      title = value;

      if (!trimmedValue) {
        titleError = 'Title is required.';
      } else if (wordCount < 2) {
        titleError = 'Title must contain at least two words.';
      } else if (!firstWordValidStart) {
        titleError = 'The first word must start with a letter or number.';
      } else if (shouldCheckFirstWordLength && firstWord.length < 3) {
        titleError = 'The first word must be at least 3 characters long for short titles.';
      } else if (checkDuplicateTitle(trimmedValue)) {
        titleError = 'This title already exists. Please make some changes to the title.';
      } else {
        titleError = '';
      }
    } else if (editModalOpen && itemToEdit) {
      itemToEdit.title = value;

      if (!trimmedValue) {
        titleError = 'Title is required.';
      } else if (wordCount < 2) {
        titleError = 'Title must contain at least two words.';
      } else if (!firstWordValidStart) {
        titleError = 'The first word must start with a letter or number.';
      } else if (shouldCheckFirstWordLength && firstWord.length < 3) {
        titleError = 'The first word must be at least 3 characters long for short titles.';
      } else if (checkDuplicateTitle(trimmedValue, itemToEdit._id)) {
        titleError = 'This title already exists. Please make some changes to the title.';
      } else {
        titleError = '';
      }
      checkForChanges();
    }
  }

  $: {
    if (title) {
      newsLink = generateNewsLink(title);
    }
  }

  function addKeyword(event) {
  if (event) {
    event.preventDefault();
  }

  if (!keywordInput || keywordInput.trim() === '') return;

  const newKeywords = keywordInput
    .split(',')
    .map(k => k.trim())
    .filter(k => {
      if (!k) return false;

      const cleanedKeyword = k.replace(/[^a-zA-Z0-9]/g, '');
      
      if (!cleanedKeyword) {
        toast.error(`Keyword "${k}" contains only special characters and cannot be added.`);
        return false;
      }

      const existsAlready = keywordsList.some(existing => 
        existing.toLowerCase() === cleanedKeyword.toLowerCase()
      );
      
      if (existsAlready) {
        toast.warning(`Keyword "${cleanedKeyword}" already exists.`);
        return false;
      }

      k = cleanedKeyword;
      return true;
    })
    .map(k => k.replace(/[^a-zA-Z0-9]/g, '')) 
    .filter((keyword, index, array) => {
      return array.findIndex(k => k.toLowerCase() === keyword.toLowerCase()) === index;
    });

  if (newKeywords.length > 0) {
    keywordsList = [...keywordsList, ...newKeywords];
  }

  keywordInput = '';
  
  if (editModalOpen) {
    checkForChanges();
  }
}

  function removeKeyword(keyword) {
    if (keywordsList.length <= 1) {
      toast.error('Minimum 1 keyword is required');
      return;
    }
    keywordsList = keywordsList.filter(k => k !== keyword);

    if (editModalOpen) {
      checkForChanges();
    }
  }

  function deleteAllKeywords() {
    if (keywordsList.length <= 1) {
      toast.error('Cannot delete all keywords. At least one keyword is required.');
      return;
    }

    keywordsList = [keywordsList[0]];
    toast.success('All keywords except one have been removed.');

    if (editModalOpen) {
      checkForChanges();
    }
  }

  function handleKeywordInputKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addKeyword(event);
    }
  }

  function handleImageError(event) {
    event.target.src = '/Digitoad.jpeg';
  }

//   $: isSubmitDisabled = ( titleError || previewTextWordCount < 200 || keywordsList.length === 0 || (imageSelected && !imageUploaded));
$: isSubmitDisabled = (
  titleError || 
  previewTextWordCount < 200 || 
  shortDescriptionWordCount.length === 0 || 
  (imageSelected && !imageUploaded) ||
  !startDate ||
  !endDate ||
  !startTime ||
  !endTime ||
  dateTimeError
);
//   $: isUpdateDisabled = editModalOpen && (!hasChanges || titleError || previewTextWordCount < 200 || shortDescriptionWordCount < 100 || keywordsList.length === 0 || (imageSelected && !imageUploaded));
$: isUpdateDisabled = editModalOpen && (
  !hasChanges || 
  titleError || 
  previewTextWordCount < 200 || 
  shortDescriptionWordCount < 100 || 
  (imageSelected && !imageUploaded) ||
  !startDate ||
  !endDate ||
  !startTime ||
  !endTime ||
  dateTimeError
);
function formatDate(dateString) {
		if (!dateString) return '';
		try {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch (e) {
			console.error('Invalid date format:', dateString);
			return '';
		}
	}
    const formEnhanceFunction = () => {
  return async ({result}) => {
    if(result.status === 200) {
      toast.success('News added successfully');
      closeCreateModal();
      location.reload();
    } else {
      toast.error(result.error?.message || 'Error adding news');
    }
    await applyAction(result);
  };
};


</script>

<section class="container mx-auto p-3">
  <div class="mb-4 flex items-center bg-gray-200 justify-between p-4 rounded-md shadow-lg">
    <h1 class="inline-flex text-2xl font-bold mr-5">
			<Icon icon="flowbite:newspaper-solid" class="inline-block text-4xl bg-gray-50 rounded-md p-1 shadow-md"/>
			<span class="pt-0.5 ml-2">Events List</span>
		</h1>
    <div class="relative">
      <Icon icon="ri:search-line" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20"/>
      <input type="text" placeholder="Search by event Title..." class="max-w-2xl w-80 h-10 border border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-primary-500 px-8 py-2 pl-10 text-sm outline-none transition-all duration-200" bind:value={searchQuery} on:input={handleSearch}/>
      {#if searchQuery}
        <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer rounded" style="color: #cb1919" on:click={clearSearch}>
          <Icon icon="oui:cross" width="16" height="16" class="font-bold" />
        </button>
      {/if}
    </div>
    <button
      class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 transition-all duration-300"
      on:click={openCreateModal}>
      Add New Event
    </button>
    
		<!-- <select bind:value={selectedwebsite} on:change={sendToServerreport} class="border-1 rounded-md px-4 py-2 text-sm border-gray-300 focus:border-primary-500 focus:ring-0">

  <option value="componentscart">Componentscart</option>
  <option value="ecomponentsbuy">Ecomponentsbuy</option>
  <option value="componentshub">Componentshub</option>
  <option value="componentstech">Componentstech</option>
  <option value="componentsorder">Componentsorder</option>
  <option value="components2web">Components2web</option>
  <option value="Digitoad">Digitoad</option>
</select> -->
  </div>
  {#if open}

  {#if recorded?.length && recorded.length > 0}
    <div class="w-full overflow-auto rounded-md shadow-md scroll-bar">
      <table class="w-full border-collapse rounded text-sm">
        <thead>
          <tr class="font-medium bg-gray-100 sticky top-0 whitespace-nowrap text-left">
            {#each headers as header}
              <th class="px-4 py-2 text-center">{header}</th>
            {/each}
          </tr>
        </thead>
        <tbody class="text-xs">
          {#each recorded as item}
            <tr class="border-t border-gray-200 font-medium whitespace-nowrap">
              <td class="px-4 py-2 text-center">{truncateText(item.title, 25)}</td>
              <td class="px-4 py-2 text-center">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <span 
                  class="text-gray-800 hover:underline cursor-pointer"
                  on:click={() => openKeywordsModal(item)}>
                  {truncateText(item?.Keyword, 15)}
                </span>
              </td>
              <td class="px-4 py-2 text-center">
                {#if item?.previewText}
                  <div class="flex items-center justify-between space-x-0 w-[200px]">
                    <span class="truncate flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {truncateText(item.previewText.replace(/<[^>]*>/g, ''), 20)}
                    </span>    
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    {#if item.previewText.length > 20}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <span 
                        class="text-blue-400 underline text-xs hover:text-blue-600 cursor-pointer whitespace-nowrap" 
                        on:click={() => openModalInfo(item)}>
                        Readmore
                      </span>
                    {/if}
                  </div>
                {:else}
                  <span>-</span>
                {/if}
              </td>
              <td class="px-4 py-2 text-center">
                <div class="flex flex-col items-center justify-center my-0.5">
                  <img 
                    src={`${PUBLIC_COMPBUY_IMAGE_PATH}/${item?.image}`}
                    alt='{item?.title || "News image"}' 
                    class="h-10 w-10 rounded shadow mb-0.5" 
                    on:error={handleImageError}>
                  <!-- <a 
                    href={`${PUBLIC_COMPBUY_IMAGE_PATH}/${item?.image}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-blue-500 hover:underline text-xs">
                    View Image
                  </a> -->
                </div>
              </td>
              <td class="px-2 py-2 ">
                <div class="flex items-center justify-around my-0.5">
                <button 
                  class="px-4 py-1 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 tra"
                  on:click={() => openEditModal(item)}>
                  Edit
                </button>
                <button 
                  class="px-3.5 py-1 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700"
                  on:click={() => openDeleteModal(item)}>
                  Delete
                </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if totalPages > 1}
      <div class="px-5 flex justify-between items-center mb-3 mt-4">
        <button
          on:click={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 disabled:bg-gray-200 disabled:border-gray-200">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          on:click={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 disabled:bg-gray-200 disabled:border-gray-200">
          Next
        </button>
      </div>
    {/if}
    {:else if recorded.length === 0 && searchQuery !== ''}
    <div class="h-60 w-full flex flex-col items-center justify-center border border-dashed rounded-md bg-gray-50 text-gray-500 shadow-inner">
      <Icon icon="mdi:magnify-close" class="w-12 h-12 text-gray-400 mb-3" />
      <h2 class="text-lg font-semibold">No Results Found</h2>
      <p class="text-sm text-gray-400">
        No data found for <span class="font-medium text-black">"{searchQuery}"</span>
      </p>
    </div>
    {:else if recorded.length === 0 && !searchQuery}
    <div class="h-60 w-full flex flex-col items-center justify-center border border-dashed rounded-md bg-gray-50 text-gray-500 shadow-inner">
      <div class="mb-3">
        <Icon icon="mdi:alert-circle-outline" class="w-12 h-12 text-gray-400" />
      </div>
      <h2 class="text-lg font-semibold">No News Data Available</h2>
      <!-- <p class="text-sm text-gray-400">Check back later for the latest updates.</p> -->
    </div>
  {/if}

  {:else}


    {#if news.records?.length && news.records.length > 0}
    <div class="w-full overflow-auto rounded-md shadow-md scroll-bar">
      <table class="w-full border-collapse rounded text-sm">
        <thead>
          <tr class="font-medium bg-gray-100 sticky top-0 whitespace-nowrap text-left">
            {#each headers as header}
              <th class="px-4 py-2 text-center">{header}</th>
            {/each}
          </tr>
        </thead>
        <tbody class="text-xs">
          {#each news.records as item}
            <tr class="border-t border-gray-200 font-medium whitespace-nowrap">
              <td class="px-4 py-2 text-center">{truncateText(item.title, 25)}</td>
              <td class="px-4 py-2 text-center"> {formatDate(item.startDate)} - {formatDate(item.endDate)}</td>
              <td class="px-4 py-2 text-center"> {(item.startTime)} - {(item.endTime)}</td>
              <td class="px-4 py-2 text-center">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <span 
                  class="text-gray-800 hover:underline cursor-pointer"
                  on:click={() => openKeywordsModal(item)}>
                  {truncateText(item?.shortDescription, 20)}
                </span>
                 {#if item?.shortDescription?.length > 20}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <!-- svelte-ignore a11y-no-static-element-interactions -->
                      <span 
                        class="text-blue-400 underline text-xs hover:text-blue-600 cursor-pointer whitespace-nowrap" 
                        on:click={() => openModalshort(item)}>
                        Readmore
                      </span>
                    {/if}
              </td>
              
              <td class="px-4 py-2 text-center">
                {#if item?.previewText}
                  <div class="flex items-center justify-between space-x-0 w-[200px]">
                    <span class="truncate flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {truncateText(item.previewText.replace(/<[^>]*>/g, ''), 20)}
                    </span>    
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    {#if item.previewText.length > 20}
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <span 
                        class="text-blue-400 underline text-xs hover:text-blue-600 cursor-pointer whitespace-nowrap" 
                        on:click={() => openModalInfo(item)}>
                        Readmore
                      </span>
                    {/if}
                  </div>
                {:else}
                  <span>-</span>
                {/if}
              </td>
              <td class="px-4 py-2 text-center">
                <div class="flex flex-col items-center justify-center my-0.5">
                  <img 
                    src={`${PUBLIC_COMPBUY_IMAGE_PATH}/${item?.image}`}
                    alt='{item?.title || "News image"}' 
                    class="h-10 w-10 rounded shadow mb-0.5" 
                    on:error={handleImageError}>
                  <!-- <a 
                    href={`${PUBLIC_COMPBUY_IMAGE_PATH}/${item?.image}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-blue-500 hover:underline text-xs">
                    View Image
                  </a> -->
                </div>
              </td>
              <td class="px-2 py-2 ">
                <div class="flex items-center justify-around my-0.5">
                <button 
                  class="px-4 py-1 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 tra"
                  on:click={() => openEditModal(item)}>
                  Edit
                </button>
                <button 
                  class="px-3.5 py-1 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700"
                  on:click={() => openDeleteModal(item)}>
                  Delete
                </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if totalPages > 1}
      <div class="px-5 flex justify-between items-center mb-3 mt-4">
        <button
          on:click={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 disabled:bg-gray-200 disabled:border-gray-200">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          on:click={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 disabled:bg-gray-200 disabled:border-gray-200">
          Next
        </button>
      </div>
    {/if}
    {:else if news.records.length === 0 && searchQuery !== ''}
    <div class="h-60 w-full flex flex-col items-center justify-center border border-dashed rounded-md bg-gray-50 text-gray-500 shadow-inner">
      <Icon icon="mdi:magnify-close" class="w-12 h-12 text-gray-400 mb-3" />
      <h2 class="text-lg font-semibold">No Results Found</h2>
      <p class="text-sm text-gray-400">
        No data found for <span class="font-medium text-black">"{searchQuery}"</span>
      </p>
    </div>
    {:else if news.records.length === 0 && !searchQuery}
    <div class="h-60 w-full flex flex-col items-center justify-center border border-dashed rounded-md bg-gray-50 text-gray-500 shadow-inner">
      <div class="mb-3">
        <Icon icon="mdi:alert-circle-outline" class="w-12 h-12 text-gray-400" />
      </div>
      <h2 class="text-lg font-semibold">No News Data Available</h2>
      <!-- <p class="text-sm text-gray-400">Check back later for the latest updates.</p> -->
    </div>
  {/if}
  {/if}

</section>
<Toaster position="bottom-right" richColors />

{#if showKeywordsModal}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div 
      class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4"
      on:click|self={closeKeywordsModal}
      role="dialog"
      aria-modal="true">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button 
          type="button"
          on:click={closeKeywordsModal}
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <span class="sr-only">Close</span>
          <Icon icon="mdi:close" class="w-6 h-6" />
        </button>
        <h2 class="text-lg font-semibold mb-4">Keywords</h2>
        {#if selectedItemKeywords.length > 0}
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <ul class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {#each selectedItemKeywords as keyword}
                <li class="bg-white border rounded-md px-3 py-1 text-sm text-center truncate">
                  {keyword}
                </li>
              {/each}
            </ul>
          </div>
        {:else}
          <p class="text-gray-500 text-center py-4">No keywords found.</p>
        {/if}
      </div>
    </div>
{/if}

{#if showModal}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4"
      on:click|self={closeModalInfo}>
      <div class="bg-white rounded shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-lg font-semibold mb-2">Complete Preview</h2>
        <div class="text-gray-800 text-justify prose">{@html selectedItem?.previewText}</div>
        <button
          on:click={closeModalInfo}
          class="mt-5 px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 transition-colors duration-300">
          Close
        </button>
      </div>
    </div>
{/if}
{#if showModalshort}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div 
      class="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4"
      on:click|self={closeModalshort}>
      <div class="bg-white rounded shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-lg font-semibold mb-2">Complete Description</h2>
        <div class="text-gray-800 text-justify prose">{@html selectedItem?.shortDescription}</div>
        <button
          on:click={closeModalshort}
          class="mt-5 px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 transition-colors duration-300">
          Close
        </button>
      </div>
    </div>
{/if}
{#if createModalOpen}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fixed inset-0 bg-gray-500 backdrop-blur-sm z-50 bg-opacity-50 flex items-center justify-center p-4" on:click|self={closeCreateModal}>
    <div class="bg-white rounded-lg p-6 w-full max-w-4xl space-y-4 max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <form 
       
        use:enhance={formEnhanceFunction}
        action="?/addnewsroom" method="POST" bind:this={form} enctype="multipart/form-data">
        <div class="space-y-6">
          <div class="flex flex-col">
            <label for="title" class="font-semibold mb-2">Title</label>
            <input type="text" id="title" name="title" 
              class="rounded border focus:outline-none border-gray-400 focus:ring-0 p-2" 
              class:border-red-500={titleError} 
              placeholder="Enter title" 
              bind:value={title} 
              on:input={handleTitleChange} 
              on:blur={(e) => { title = e.target.value.replace(/\s+$/, ''); }}
              pattern=".*\S+.*"
              title="Title must contain at least one non-space character"
              required >
            {#if titleError}
              <p class="text-red-500 text-xs mt-1">{titleError}</p>
            {/if}
          </div>
          <div class="space-y-4 border-t pt-4">
  <h3 class="font-semibold text-gray-700 mb-3">Event Schedule</h3>
  
  <!-- Date Fields Row -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Start Date -->
    <div class="flex flex-col">
      <label for="startDate" class="font-semibold mb-2">
        Start Date <span class="text-red-500">*</span>
      </label>
      <input 
        type="date" 
        id="startDate" 
        name="startDate" 
        class="rounded border focus:outline-none border-gray-400 focus:ring-0 p-2" 
        class:border-red-500={dateTimeError && !startDate}
        bind:value={startDate}
        on:change={handleStartDateChange}
        min={today}
        required />
    </div>
    
    <!-- End Date -->
    <div class="flex flex-col">
      <label for="endDate" class="font-semibold mb-2">
        End Date <span class="text-red-500">*</span>
      </label>
      <input 
        type="date" 
        id="endDate" 
        name="endDate" 
        class="rounded border focus:outline-none border-gray-400 focus:ring-0 p-2" 
        class:border-red-500={dateTimeError && !endDate}
        bind:value={endDate}
        on:change={handleEndDateChange}
        min={startDate || today}
        required />
    </div>
  </div>
  
  <!-- Time Fields Row -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Start Time -->
    <div class="flex flex-col">
      <label for="startTime" class="font-semibold mb-2">
        Start Time <span class="text-red-500">*</span>
      </label>
      <input 
        type="time" 
        id="startTime" 
        name="startTime" 
        class="rounded border focus:outline-none border-gray-400 focus:ring-0 p-2" 
        class:border-red-500={dateTimeError && !startTime}
        bind:value={startTime}
        on:change={handleStartTimeChange}
        required />
    </div>
    
    <!-- End Time -->
    <div class="flex flex-col">
      <label for="endTime" class="font-semibold mb-2">
        End Time <span class="text-red-500">*</span>
      </label>
      <input 
        type="time" 
        id="endTime" 
        name="endTime" 
        class="rounded border focus:outline-none border-gray-400 focus:ring-0 p-2" 
        class:border-red-500={dateTimeError && !endTime}
        bind:value={endTime}
        on:change={handleEndTimeChange}
        required />
    </div>
  </div>
  
  <!-- Date/Time Error Display -->
  {#if dateTimeError}
    <div class="bg-red-50 border border-red-200 rounded p-3">
      <p class="text-red-600 text-sm flex items-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        {dateTimeError}
      </p>
    </div>
  {/if}
  
  <!-- Duration Display (Optional) -->
  {#if startDate && endDate && startTime && endTime && !dateTimeError}
    <div class="bg-green-50 border border-green-200 rounded p-3">
      <p class="text-green-700 text-sm flex items-center">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Event Duration: {startDate === endDate ? 'Same day' : `${startDate} to ${endDate}`} | {startTime} - {endTime}
      </p>
    </div>
  {/if}
  
  <!-- Guidelines -->
  <div class="bg-blue-50 border border-blue-200 rounded p-3">
    <div class="text-blue-800 text-sm">
      <strong>📅 Schedule Guidelines:</strong>
      <ul class="list-disc ml-4 mt-1 space-y-1">
        <li>Start date cannot be in the past</li>
        <li>End date must be on or after start date</li>
        <li>Minimum event duration is 1 hour</li>
        <li>End time must be after start time for same-day events</li>
      </ul>
    </div>
  </div>
</div>

<!-- Hidden inputs for form submission -->
<input type="hidden" name="startDate" value={startDate}>
<input type="hidden" name="endDate" value={endDate}>
<input type="hidden" name="startTime" value={startTime}>
<input type="hidden" name="endTime" value={endTime}>
          <!-- <div class="flex flex-col">
            <label for="keyword" class="font-semibold mb-2">Keyword</label>
            <div class="flex space-x-2">
              <input 
                type="text" 
                id="keyword"
                class="rounded border p-2 flex-grow" 
                placeholder="Enter comma-separated keywords" 
                bind:value={keywordInput}
                on:keydown={handleKeywordInputKeydown}>
              <button 
                type="button" 
                class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                on:click={addKeyword}
                disabled={isKeywordInputEmpty}>
                Add
              </button>
              {#if keywordsList.length > 10}
                <button  
                 type="button" 
                 class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-300 flex items-center gap-1 relative group"
                 on:click={deleteAllKeywords}>
                 <span class="relative flex items-center">
                   <Icon icon="mdi:delete" class="text-lg" />
                   <span class="absolute left-1/2 transform -translate-x-1/2 z-50 whitespace-nowrap top-full mt-2 px-2 bg-gray-200 text-gray-600 text-xs py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                     Delete all
                   </span>
                 </span>
                </button>
              {/if}
            </div>
            {#if keywordsList.length === 0}
              <p class="text-amber-600 text-xs mt-1">
                <strong class="text-red-600">Note:</strong> Please add at least one keyword before submitting.
              </p>
            {/if}
            {#if keywordsList.length > 0}
              <div class="mt-2 flex flex-wrap gap-2">
                {#each keywordsList as keyword}
                  <span class="bg-gray-100 px-2 py-1 rounded-md border border-gray-500 flex items-center space-x-1 hover:scale-95 transition-all duration-300">
                    <span>{keyword}</span>
                    <button 
                      type="button" 
                      class="text-red-500 items-center flex"
                      on:click={() => removeKeyword(keyword)}>
                      <Icon icon="mdi:close" class="w-4 h-4" />
                    </button>
                  </span>
                {/each}
              </div>
            {/if}
            <input type="hidden" name="Keyword" value={keywordsList.join(', ')}>
          </div> -->
          <div class="flex flex-col">
            <label for="editShortDescription" class="font-semibold mb-2">Short Description(1st page)</label>
            <textarea 
              id="editShortDescription" 
              name="shortDescription" 
              class="rounded border focus:outline-none border-gray-400 focus:ring-0 text-sm p-2 min-h-40 resize-none" 
              class:border-red-500={shortDescriptionError}
              placeholder="Enter short description for the main page" 
              bind:value={shortDescriptionContent}
              on:input={handleShortDescriptionInput}
              required></textarea>
              <div class="flex justify-between items-center mt-1">
                <span class="text-sm text-gray-500">Word count: {shortDescriptionWordCount}/100</span>
                {#if shortDescriptionError}
                <p class="text-red-500 text-xs">{shortDescriptionError}</p>
                {/if}
              </div>
              {#if shortDescriptionWordCount < 100}
              <p class="text-amber-600 text-xs mt-1">
                <strong class="text-red-600">Note:</strong>
                The minimum word count required for SEO optimization is <strong>100 words</strong>.
                This helps improve search engine visibility and user engagement.
              </p>
              {/if}
              <input type="hidden" name="shortDescription" value={shortDescriptionContent.trim()}>
            </div>
          <div class="flex flex-col">
            <label for="previewText" class="font-semibold mb-2">PreviewText</label>
            <div class="mb-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
              <strong>Image Upload Guidelines:</strong> When adding images through the editor toolbar, please ensure:
              <ul class="list-disc ml-4 mt-1">
                <li>Maximum file size: 2MB</li>
                <li>Supported formats: JPG, PNG, GIF, WebP</li>
                <li>Click on inserted images to adjust alignment</li>
              </ul>
            </div>
            <div bind:this={editorContainer} class="h-64 border rounded" class:border-red-500={previewTextError}></div>
            <input type="hidden" name="previewText" value={previewTextContent} />
            <div class="flex justify-between items-center mt-1">
              <span class="text-sm text-gray-500">Word count: {previewTextWordCount}/200</span>
              {#if previewTextError}
                <p class="text-red-500 text-xs">{previewTextError}</p>
              {/if}
            </div>
            {#if previewTextWordCount < 200}
              <p class="text-amber-600 text-xs mt-1">
                <strong class="text-red-600">Note:</strong>
                Please Add the minimum word count required for the events component is <strong>200 words</strong>.
                Kindly ensure that your submission meets this requirement.
              </p>
            {/if}
          </div>
            
         
           <div class="upload-container">
    <div>
      <label for="imageUpload" class="font-semibold mb-2">Image</label>
      <input 
        type="file" 
        id="imageUpload" 
        accept="image/*" 
        required 
        on:change={handleFileChange} />
      {#if previewUrl}
        <img 
          src={previewUrl} 
          alt="Preview" 
          class="preview h-32 w-32 object-cover mt-2 rounded" 
          on:error={handleImageError} />
      {/if}
    </div>
    <div class="flex items-center mt-2">
      <button 
        type="button" 
        on:click={uploadImage} 
        class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 transition-all duration-300"
        disabled={!imageSelected || imageUploaded}>
        Process Image
      </button>
      {#if imageUploaded}
        <span class="ml-2 text-green-500 text-sm flex items-center">
          <Icon icon="mdi:check-circle" class="w-4 h-4 mr-1" />
          Image processed successfully
        </span>
      {/if}
    </div>
    {#if imageError}
      <p class="text-red-500 text-xs mt-1">{imageError}</p>
    {/if}
  </div>
   <input type="hidden" name="image" bind:value={filename}>

          <!-- <div class="upload-container">
            <div>
              <label for="imageUpload" class="font-semibold mb-2">Image</label>
              <input type="file" id="imageUpload" accept="image/*" required on:change={handleFileChange} />
              {#if previewUrl}
                <img src={previewUrl} alt="Preview" class="preview h-32 w-32 object-cover mt-2 rounded" on:error={handleImageError} />
              {/if}
            </div>
            <div class="flex items-center mt-2">
              <button 
                type="button" 
                on:click={uploadImage} 
                class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 transition-all duration-300"
                disabled={!imageSelected || imageUploaded}>
                Upload
              </button>
              {#if imageUploaded}
                <span class="ml-2 text-green-500 text-sm flex items-center">
                  <Icon icon="mdi:check-circle" class="w-4 h-4 mr-1" />
                  Image uploaded successfully
                </span>
              {/if}
            </div>
            {#if imageError}
              <p class="text-red-500 text-xs mt-1">{imageError}</p>
            {/if}
          </div> -->
          <div class="flex flex-col">
            <input type="hidden" name="newsLink" class="rounded border p-2" bind:value={newsLink} required>
          </div>
          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              on:click={closeCreateModal}
              class="px-5 py-1.5 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 hover:text-white transition-all duration-300">
              Cancel
            </button>
            <button type="button" on:click={handleSubmit} disabled={isSubmitDisabled}
              class="px-5 py-1.5 bg-gray-700 border border-gray-700 text-white rounded hover:bg-white hover:text-gray-700 transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}

{#if editModalOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="fixed inset-0 bg-gray-500 backdrop-blur-sm z-50 bg-opacity-50 flex items-center justify-center p-4" on:click|self={closeEditModal}>
    <div class="bg-white rounded-lg p-6 w-full max-w-4xl space-y-4 max-h-[90vh] overflow-y-auto" on:click|stopPropagation>
      <form 
        use:enhance={() => {
          return async ({result}) => {
            if(result.status === 200) {
              toast.success('News updated successfully');
              closeEditModal();
            //   location.reload();
            } else {
              toast.error(result.error?.message || 'Error updating news');
            }
            await applyAction(result);
          };
        }}
        action="?/updatenewsroom" 
        method="POST" 
        enctype="multipart/form-data">
        <input type="hidden" name="id" value={itemToEdit?._id || ''}>
        <div class="space-y-6">
          <div class="flex flex-col">
            <label for="editTitle" class="font-semibold mb-2">Title</label>
            <input type="text" id="editTitle" name="title" 
                class="rounded border focus:outline-none border-gray-400 focus:ring-0 p-2" 
                class:border-red-500={titleError} 
                placeholder="Update title" 
                bind:value={itemToEdit.title} 
                on:input={handleTitleChange}
                on:blur={(e) => { title = e.target.value.trim(); }}
                pattern=".*\S+.*"
                title="Title must contain at least one non-space character" 
                required>
              {#if titleError}
                <p class="text-red-500 text-xs mt-1">{titleError}</p>
              {/if}
          </div>
     
          
          <div class="flex flex-col">
            <label for="editShortDescription" class="font-semibold mb-2">Short Description(1st page)</label>
            <textarea 
              id="editShortDescription" 
              name="shortDescription" 
              class="rounded border focus:outline-none border-gray-400 focus:ring-0 text-sm p-2 min-h-40 resize-none" 
              class:border-red-500={shortDescriptionError}
              placeholder="Enter short description for SEO purposes..." 
              bind:value={shortDescriptionContent}
              on:input={handleShortDescriptionInput}
              required></textarea>
              <div class="flex justify-between items-center mt-1">
                <span class="text-sm text-gray-500">Word count: {shortDescriptionWordCount}/100</span>
                {#if shortDescriptionError}
                <p class="text-red-500 text-xs">{shortDescriptionError}</p>
                {/if}
              </div>
              {#if shortDescriptionWordCount < 100}
              <p class="text-amber-600 text-xs mt-1">
                <strong class="text-red-600">Note:</strong>
                The minimum word count required for SEO optimization is <strong>100 words</strong>.
                This helps improve search engine visibility and user engagement.
              </p>
              {/if}
              <input type="hidden" name="shortDescription" value={shortDescriptionContent.trim()}>
            </div>
            <div class="flex flex-col">
            <label for="editPreviewText" class="font-semibold mb-2">Preview Text</label>
            <div class="mb-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
              <strong>Image Upload Guidelines:</strong> When adding images through the editor toolbar, please ensure:
              <ul class="list-disc ml-4 mt-1">
                <li>Maximum file size: 2MB</li>
                <li>Supported formats: JPG, PNG, GIF, WebP</li>
                <li>Click on inserted images to adjust alignment</li>
              </ul>
            </div>
            <div bind:this={editorContainer} class="h-64 border rounded" class:border-red-500={previewTextError}></div>
            <input type="hidden" name="previewText" value={previewTextContent}>
            <div class="flex justify-between items-center mt-1">
              <span class="text-sm text-gray-500">Word count: {previewTextWordCount}/200</span>
              {#if previewTextError}
                <p class="text-red-500 text-xs">{previewTextError}</p>
              {/if}
            </div>
            {#if previewTextWordCount < 200}
              <p class="text-amber-600 text-xs mt-1">
                <strong class="text-red-600">Note:</strong>
                Please Add the minimum word count required for the newsroom component is <strong>200 words</strong>.
                Kindly ensure that your submission meets this requirement.
              </p>
            {/if}
          </div>
          <input type="hidden" name="newsLink" value={itemToEdit ? generateNewsLink(itemToEdit.title) : ''}>
          <div class="flex justify-end space-x-3">
            <button 
              type="button" 
              on:click={closeEditModal}
              class="px-5 py-1.5 bg-gray-300 text-gray-700 rounded hover:bg-gray-500 hover:text-white duration-300 transition-colors">
              Cancel
            </button>
            <button 
            type="submit"
            disabled={isUpdateDisabled}
            class="px-5 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">
            Update
          </button>
          </div>
        </div>
      </form>
    </div>
  </div>
{/if}

{#if deleteModalOpen}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fixed inset-0 bg-gray-500 backdrop-blur-sm z-50 bg-opacity-50 flex items-center justify-center p-4" on:click|self={closeDeleteModal}>
    <div class="bg-white rounded-lg p-6 max-w-md w-full space-y-4" on:click|stopPropagation>
      <form 
        use:enhance={() => {
          return async ({result}) => {
            if(result.status === 200){
              toast.success('Successfully deleted');
            //   location.reload(); 
            } else {
              toast.error(result.error?.message || 'Error deleting');
            }
            await applyAction(result);
          }
        }}
        method="POST" action="?/deletenews">
        <input type="hidden" name="id" value={itemToDelete._id} />
        <h2 class="text-lg font-bold">Delete</h2>
        <p class="mt-2">Are you sure you want to delete?</p>
        <div class="p-4 mt-4 flex items-center justify-end space-x-4">
          <button 
            type="button" 
            on:click={closeDeleteModal}
            class="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-500 hover:text-white transition-colors duration-300">
            Cancel
          </button>
          <button 
            type="submit" 
            class=" bg-red-700 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors duration-300">
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

{#if showAlignmentModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="fixed inset-0 bg-gray-500/30 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center" on:click|self={closeAlignmentModal}>
    <div class="bg-white rounded-lg p-6 w-80" on:click|stopPropagation>
      <h3 class="text-lg font-semibold mb-4">Image Alignment</h3>
      <div class="space-y-3">
        <label class="flex items-center">
          <input type="radio" bind:group={selectedAlignment} value="left" class="mr-2">
          Left
        </label>
        <label class="flex items-center">
          <input type="radio" bind:group={selectedAlignment} value="center" class="mr-2">
          Center
        </label>
        <label class="flex items-center">
          <input type="radio" bind:group={selectedAlignment} value="right" class="mr-2">
          Right
        </label>
      </div>
      <div class="flex justify-end space-x-2 mt-6">
        <button 
          type="button" 
          on:click={closeAlignmentModal}
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button 
          type="button" 
          on:click={applyImageAlignment}
          class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Apply
        </button>
      </div>
    </div>
  </div>
{/if}