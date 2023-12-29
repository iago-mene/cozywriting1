document.addEventListener("DOMContentLoaded", function () {
  const backgrounds = [
    'url(covers/gif1.gif)',
    'url(covers/gif2.gif)',
    'url(covers/gif3.gif)',
    'url(covers/gif4.gif)',
    'url(covers/gif5.gif)',
    'url(covers/gif6.gif)',
    'url(covers/gif7.gif)',
    'url(covers/gif8.gif)',
    'url(covers/gif9.gif)',
    'url(covers/gif10.gif)',
    'url(covers/gif11.gif)',
    'url(covers/gif12.gif)',
    // Add paths for all your gif files
  ];

  function loadRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const imageUrl = backgrounds[randomIndex];

    document.body.style.backgroundImage = imageUrl;
    document.body.style.backgroundBlendMode = "hard-light";
    document.body.style.backgroundSize = "cover";
  }

  // Load a random background on page load
  loadRandomBackground();

  // Set the default font and font size
  const defaultFont = "Oxanium"; // Change to your desired default font
  const defaultFontSize = "20"; // Change to your desired default font size

  // Font selection functionality
    const fontSelector = document.getElementById('fontSelector');
    const notesTextarea = document.querySelector('.notes-container textarea');
  
    fontSelector.addEventListener('change', function () {
      // Apply the font to the notes textarea if it exists
      if (notesTextarea) {
        try {
          notesTextarea.style.setProperty('font-family', fontSelector.value, 'important');
        } catch (error) {
          console.error('Error setting font:', error.message);
        }
      }
    });

    // Font size selection functionality
    const fontSizeSelector = document.getElementById('fontSizeSelector');

    fontSizeSelector.addEventListener('change', function () {
      const selectedFontSize = fontSizeSelector.value;
      notesTextarea.style.fontSize = `${selectedFontSize}px`;
    });

      // Function to get the selected text
  function getSelectedText() {
    return window.getSelection().toString();
  }

  // Color picker functionality
  const colorPicker = document.getElementById('colorPicker');

  colorPicker.addEventListener('input', function () {
    const selectedColor = colorPicker.value;
    notesTextarea.style.color = selectedColor;
  });

    // Background button functionality
    const bgButton = document.getElementById('bgButton');

    bgButton.addEventListener('click', function () {
      loadRandomBackground();
    });

  // Clock functionality
  function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('clock').innerText = timeString;
  }
  
  // Function to update the clock and catgif position
  function updateClockAndCatGif() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('clock').innerText = timeString;

    // Update catgif position along with clock window
    const clockWindow = document.getElementById("movableWindow");
    const catGif = document.getElementById('catGif');

    const catGifOffsetX = 1; // Adjust the horizontal offset
    const catGifOffsetY = -26; // Adjust the vertical offset

    catGif.style.left = clockWindow.offsetLeft + catGifOffsetX + 'px';
    catGif.style.top = clockWindow.offsetTop + catGifOffsetY + 'px';
  }

  // Update clock and catgif position every second
  setInterval(updateClockAndCatGif, 0.0001);


  
  // Save button functionality
  const saveButton = document.getElementById('saveButton');

  saveButton.addEventListener('click', function () {
    const notesContent = notesTextarea.value;
    saveTextAsFile(notesContent, 'notes.txt');
    unsavedChanges = false; // Reset unsaved changes after saving
  });

  // Function to save text content as a file
  function saveTextAsFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  

  // Update clock every second
  setInterval(updateClock, 1000);

  // Display the current time on page load
  updateClock();

  // Make the window draggable
  dragElement(document.getElementById("movableWindow"));

  // Update clock every second
  setInterval(updateClock, 1000);

  // Function to update the clock
  function updateClock() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      document.getElementById('clock').innerText = timeString;
  }

  function dragElement(elmnt) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    if (document.getElementById(elmnt.id + "Header")) {
        // If present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
        // Otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // Call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      
      // Calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
  
      // Calculate the new position of the element:
      let newLeft = elmnt.offsetLeft - pos1;
      let newTop = elmnt.offsetTop - pos2;
  
      // Get the window dimensions
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
  
      // Get the element dimensions
      const elementWidth = elmnt.offsetWidth;
      const elementHeight = elmnt.offsetHeight;
  
      // Constrain the element within the screen boundaries
      newLeft = Math.max(0, Math.min(newLeft, windowWidth - elementWidth));
      newTop = Math.max(0, Math.min(newTop, windowHeight - elementHeight));
  
      // Set the element's new position:
      elmnt.style.left = newLeft + "px";
      elmnt.style.top = newTop + "px";
  
      // Check if the element is out of the screen
      const isOutOfScreen = newLeft < 0 || newTop < 0 || newLeft + elementWidth > windowWidth || newTop + elementHeight > windowHeight;
  
      // Close the window if it's out of the screen
      if (isOutOfScreen) {
          closeWindow(elmnt);
      }
  }

    function closeDragElement(e) {
        // Stop moving when the mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        // Check if the click occurred on the close button
        if (e.target.classList.contains('close-button')) {
            closeWindow(elmnt);
        }
    }

    // Function to close the window and play audio
    function closeWindow(elmnt) {
        elmnt.style.display = 'none';
        closeWindowAudio.play();
        closeWindowAudio.volume = 0.2;
    }
}

  // Rain button functionality
  const rainButton = document.getElementById('rainButton');
  const rainAudio = new Audio('sfx/rain.mp3');

  rainButton.addEventListener('click', function () {
    if (rainAudio.paused) {
      rainAudio.loop = true;
      rainAudio.play();
      rainButton.innerHTML = '<span class="material-icons">water_drop</span>';
    } else {
      rainAudio.pause();
      rainAudio.currentTime = 0;
      rainButton.innerHTML = '<span class="material-icons">format_color_reset</span>';
    }
    // Rain volume slider functionality
const volumeRainSlider = document.getElementById('volumeRain');

volumeRainSlider.addEventListener('input', function () {
  const volumeRain = volumeRainSlider.value;

  // Set the volume of the shared rain sound audio element
  rainAudio.volume = volumeRain / 100;
});
  });
  

// Use the dragElement function for your window
dragElement(document.getElementById('movableWindow'));

  // Volume slider functionality
  const volumeSlider = document.getElementById('volume');
  const volumeValue = document.getElementById('volume-value');

  volumeSlider.addEventListener('input', function () {
    const volume = volumeSlider.value;

    // Set the volume of the audio element
    audio.volume = volume / 100;
  });
  let darkMode = false;
  const notesContainer = document.querySelector('.notes-container');
  
  toggleModeButton.addEventListener('click', function () {
    darkMode = !darkMode;
  
    if (darkMode) {
      toggleModeButton.innerHTML = '<span class="material-icons">dark_mode</span>';
      notesTextarea.style.backgroundColor = 'rgba(0, 0, 0, 0.582)';
      notesTextarea.style.color = '#ffffff';
    } else {
      toggleModeButton.innerHTML = '<span class="material-icons">light_mode</span>';
      notesTextarea.style.backgroundColor = 'rgba(255, 255, 255, 0.582)';
      notesTextarea.style.color = '#000000';
    }
  });
  
});

// Playlist and audio elements
let playlist = [
  'songs/song1.mp3',
  'songs/song2.mp3',
  'songs/song3.mp3',
  'songs/song4.mp3',
  'songs/song5.mp3',
  'songs/song6.mp3',
  'songs/song7.mp3',
  'songs/song8.mp3',
  'songs/song9.mp3',
  'songs/song10.mp3',
  'songs/song11.mp3',
  'songs/song12.mp3',
  'songs/song13.mp3',
  'songs/song14.mp3',
  'songs/song15.mp3',
  'songs/song16.mp3',
  'songs/song17.mp3',
  'songs/song18.mp3',
  'songs/song19.mp3',
  'songs/song20.mp3',
  'songs/song21.mp3',
  'songs/song22.mp3',
  'songs/song23.mp3',
  'songs/song24.mp3',
  'songs/song25.mp3',
  // Add paths for all your songs
];

// Shuffle the playlist array
shufflePlaylist();

let currentSongIndex = 0;
const audio = new Audio(playlist[currentSongIndex]);

// Play button functionality
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = '<span class="material-icons">pause</span>';
  } else {
    audio.pause();
    playButton.innerHTML = '<span class="material-icons">play_arrow</span>';
  }
});

// Next button functionality
const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', playNextSong);

// Previous button functionality
const prevButton = document.getElementById('prevButton');
prevButton.addEventListener('click', playPrevSong);

// Function to play the next song
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  audio.src = playlist[currentSongIndex];
  audio.play();
  updateCurrentSong();
}

// Function to play the previous song
function playPrevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  audio.src = playlist[currentSongIndex];
  audio.play();
  updateCurrentSong();
}

// Event listener for the 'ended' event to play the next song when the current song finishes
audio.addEventListener('ended', function () {
  playNextSong();
});

// Update the current playing song
function updateCurrentSong() {
  // Implement the logic to update the UI with the current playing song information if needed
}

// Function to shuffle the playlist array
function shufflePlaylist() {
  for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
  }
}

let unsavedChanges = false;

// Listen for changes in the textarea
const notesTextarea = document.getElementById('TextArea');
notesTextarea.addEventListener('input', function () {
  unsavedChanges = true;
});

// Listen for the beforeunload event
window.addEventListener('beforeunload', function (event) {
  if (unsavedChanges) {
    const message = 'You have unsaved changes. Are you sure you want to leave?';
    event.returnValue = message; // Standard for most browsers
    return message; // For some older browsers
  }
});

document.getElementById('catGif').addEventListener('click', function () {
  // Play the meow audio
  const meowAudio = document.getElementById('meowAudio');
  meowAudio.volume = 0.3;
  meowAudio.play();
});

  // Listen for changes in the textarea
  const notesTextArea = document.getElementById('TextArea');
  notesTextarea.addEventListener('input', function () {
    unsavedChanges = true;
  });

  // Listen for the beforeunload event
  window.addEventListener('beforeunload', function (event) {
    if (unsavedChanges) {
      const message = 'You have unsaved changes. Are you sure you want to leave?';
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    }
  });

  const clockButton = document.getElementById('clockButton');
  const clockWindow = document.getElementById('movableWindow');
  const catGif = document.getElementById('catGif');
  let isDragging = false;

  function toggleClockWindow() {
    if (clockWindow.style.display === 'none') {
      clockWindow.style.display = 'block';
      clockButton.style.display = 'none';
    } else {
      clockWindow.style.display = 'none';
      clockButton.style.display = 'none'; // Updated this line to keep the button hidden initially
    }
  }

  clockButton.addEventListener('click', toggleClockWindow);
  
  document.getElementById("clockButton").addEventListener("click", function () {
    // Play the window appear sound
    windowAppearAudio.play();
    windowAppearAudio.volume = 0.2;
  });

  // Audio element for window appear sound
const windowAppearAudio = new Audio("sfx/windowappear.mp3");

  // Set isDragging to true when starting to drag the window
  clockWindow.addEventListener('mousedown', function () {
    isDragging = true;
  });

  // Set isDragging to false when releasing the mouse button
  window.addEventListener('mouseup', function () {
    isDragging = false;
  });

  // Show the clock button when the close button is clicked
  const closeClockWindowButton = document.getElementById('closeClockWindowButton');
  closeClockWindowButton.addEventListener('click', function () {
    clockButton.style.display = 'block';
  });

  // Adjust clock window visibility based on screen width
  function adjustClockWindowVisibility() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 600) {
      clockWindow.style.display = 'none';
      clockButton.style.display = 'block';
    } else {
      clockButton.style.display = 'none';
      clockWindow.style.display = 'block';
    }
  }

  // Adjust clock window visibility on page load and window resize
  window.addEventListener('load', adjustClockWindowVisibility);
  window.addEventListener('resize', adjustClockWindowVisibility);
