import { CourseService } from './course-data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const video = document.getElementById('main-video');
    const playBtn = document.getElementById('play-pause-btn');
    const seekBar = document.getElementById('seek-bar');
    const timeDisplay = document.getElementById('time-display');
    const muteBtn = document.getElementById('mute-btn');
    const volumeBar = document.getElementById('volume-bar');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    if (video) {
        // Play/Pause
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Update Seek Bar
        video.addEventListener('timeupdate', () => {
            const value = (video.currentTime / video.duration) * 100;
            seekBar.value = value;

            // Format Time
            const currentMins = Math.floor(video.currentTime / 60);
            const currentSecs = Math.floor(video.currentTime % 60);
            const durationMins = Math.floor(video.duration / 60) || 0;
            const durationSecs = Math.floor(video.duration % 60) || 0;

            timeDisplay.textContent = `${currentMins}:${currentSecs < 10 ? '0' + currentSecs : currentSecs} / ${durationMins}:${durationSecs < 10 ? '0' + durationSecs : durationSecs}`;
        });

        // Seek
        seekBar.addEventListener('input', () => {
            const time = (seekBar.value / 100) * video.duration;
            video.currentTime = time;
        });

        // Volume
        volumeBar.addEventListener('input', () => {
            video.volume = volumeBar.value;
            if (video.volume === 0) {
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });

        muteBtn.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                video.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });

        // Fullscreen
        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        });
    }

    // Load Data Logic (Simplified)
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    const lessonId = urlParams.get('lessonId');

    if (courseId) {
        const course = await CourseService.getById(courseId);
        if (course) {
            // Populate Playlist
            const playlist = document.getElementById('playlist');
            if (playlist) {
                let currentLessonFound = false;

                course.modules.forEach((mod, mIdx) => {
                    playlist.innerHTML += `<div class="font-bold text-sm bg-gray-100 p-2 mt-2">Module ${mIdx + 1}: ${mod.title}</div>`;
                    mod.lessons.forEach((lesson, lIdx) => {
                        const isActive = lesson.id === lessonId ? 'bg-blue-100 text-primary' : 'hover:bg-gray-50';
                        playlist.innerHTML += `
                            <a href="?courseId=${course._id || course.id}&lessonId=${lesson.id}" class="block p-2 text-sm border-b ${isActive} flex justify-between">
                                <span>${lIdx + 1}. ${lesson.title}</span>
                                <span class="text-xs text-gray-500">${lesson.duration}</span>
                            </a>
                        `;

                        if (lesson.id === lessonId) {
                            const lessonTitleEl = document.getElementById('lesson-title');
                            if (lessonTitleEl) lessonTitleEl.textContent = lesson.title;
                            // In a real app, set video src here
                            // video.src = lesson.videoUrl; 
                            currentLessonFound = true;
                        }
                    });
                });
            }
        }
    }
});
