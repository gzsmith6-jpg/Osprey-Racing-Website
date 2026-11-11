        // ---------- Tabs ----------
        const informationMenu = document.getElementById('information-menu');
        const informationMenuToggle = document.querySelector('.information-menu-toggle');
        const advisorDialog = document.getElementById('advisor-dialog');
        const advisorCard = document.getElementById('advisor-card');

        advisorCard.addEventListener('click', () => advisorDialog.showModal());
        advisorDialog.querySelector('.advisor-dialog-close').addEventListener('click', () => advisorDialog.close());
        advisorDialog.addEventListener('click', event => {
            if (event.target === advisorDialog) advisorDialog.close();
        });
        advisorDialog.addEventListener('close', () => advisorCard.focus());

        const processDialog = document.getElementById('process-dialog');
        const processDialogTitle = document.getElementById('process-dialog-title');
        const processCarousel = document.getElementById('process-carousel');
        const processCarouselTrack = document.getElementById('process-carousel-track');
        const processCarouselDots = document.getElementById('process-carousel-dots');
        const processDialogCopy = document.getElementById('process-dialog-copy');
        const processPreviousButton = processCarousel.querySelector('.process-carousel-previous');
        const processNextButton = processCarousel.querySelector('.process-carousel-next');
        let processDialogTrigger = null;
        let activeProcessSlide = 0;

        const processDetails = {
            design: {
                title: 'Design',
                photos: [
                    { src: 'Design1.png', alt: 'Osprey Racing design process photo 1' },
                    { src: 'Design2.png', alt: 'Osprey Racing design process photo 2' },
                    { src: 'Design3.png', alt: 'Osprey Racing design process photo 3' },
                    { src: 'Design4.png', alt: 'Osprey Racing design process photo 4' }
                ],
                paragraphs: [
                    'Every car starts as an idea shaped by performance goals, rules, available resources, and lessons from previous seasons. The team develops those ideas into detailed computer-aided designs (CAD) for the chassis, suspension, aerodynamics, and other vehicle systems.',
                    'Digital models help the team check fit, packaging, and clearances before parts are made. 3D-printed prototypes turn selected designs into physical parts that can be inspected and refined before committing to final fabrication.'
                ]
            },
            build: {
                title: 'Building',
                photos: [
                    { src: 'Building1.png', alt: 'Osprey Racing building process photo 1' },
                    { src: 'Building2.png', alt: 'Osprey Racing building process photo 2' },
                    { src: 'Building3.png', alt: 'Osprey Racing building process photo 3' },
                    { src: 'Building4.png', alt: 'Osprey Racing building process photo 4' },
                    { src: 'Building5.png', alt: 'Osprey Racing building process photo 5' }
                ],
                paragraphs: [
                    'Once designs are ready, the team turns drawings and models into real components. Members cut, shape, machine, weld, and assemble parts while coordinating work across the car’s systems.',
                    'The chassis and components come together through careful fitting and iteration. Building the car is a hands-on team effort that connects engineering decisions to the finished vehicle.'
                ]
            },
            test: {
                title: 'Testing',
                photos: [
                    { src: 'Test1.png', alt: 'Osprey Racing testing process photo 1' },
                    { src: 'Test2.png', alt: 'Osprey Racing testing process photo 2' },
                    { src: 'Test3.png', alt: 'Osprey Racing testing process photo 3' },
                    { src: 'Test4.png', alt: 'Osprey Racing testing process photo 4' }
                ],
                paragraphs: [
                    'Testing helps the team understand how the car performs outside of a computer model. Drivers and engineers evaluate the vehicle, review observations and data, and identify areas that need adjustment.',
                    'The team uses each test session to improve setup, reliability, and driver confidence, then applies what it learns to the next round of design and development.'
                ]
            },
            competition: {
                title: 'Competition',
                photos: [
                    { src: 'comp1.png', alt: 'Osprey Racing competition photo 1' },
                    { src: 'comp2.png', alt: 'Osprey Racing competition photo 2' },
                    { src: 'comp3.png', alt: 'Osprey Racing competition photo 3' },
                    { src: 'comp4.png', alt: 'Osprey Racing competition photo 4' }
                ],
                paragraphs: [
                    'Competition brings the team’s design, build, and testing work together. Students present the car, work through technical inspection, and compete in dynamic events that challenge the vehicle and the team.',
                    'The event is also a chance to learn from other universities, meet the Formula SAE community, and bring new ideas back to the next season.'
                ]
            },
        };

        function updateProcessCarousel() {
            const slideWidth = processCarouselTrack.clientWidth;
            activeProcessSlide = slideWidth
                ? Math.round(processCarouselTrack.scrollLeft / slideWidth)
                : 0;
            const lastSlide = processCarouselTrack.children.length - 1;
            processPreviousButton.disabled = lastSlide < 1;
            processNextButton.disabled = lastSlide < 1;
            processCarouselDots.querySelectorAll('.process-carousel-dot').forEach((dot, index) => {
                dot.setAttribute('aria-current', String(index === activeProcessSlide));
            });
        }

        function openProcessDialog(processKey, trigger) {
            const details = processDetails[processKey];
            processDialogTrigger = trigger;
            processDialogTitle.textContent = details.title;
            processCarouselTrack.replaceChildren();
            processCarouselDots.replaceChildren();
            processDialogCopy.replaceChildren();

            details.photos.forEach((photo, index) => {
                const image = document.createElement('img');
                image.className = 'process-carousel-slide';
                image.src = photo.src;
                image.alt = photo.alt;
                image.loading = 'lazy';
                image.decoding = 'async';
                processCarouselTrack.appendChild(image);

                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'process-carousel-dot';
                dot.setAttribute('aria-label', `Show photo ${index + 1} of ${details.photos.length}`);
                dot.setAttribute('aria-current', String(index === 0));
                dot.addEventListener('click', () => {
                    processCarouselTrack.scrollTo({
                        left: index * processCarouselTrack.clientWidth,
                        behavior: 'instant'
                    });
                    updateProcessCarousel();
                });
                processCarouselDots.appendChild(dot);
            });

            details.paragraphs.forEach(text => {
                const paragraph = document.createElement('p');
                paragraph.textContent = text;
                processDialogCopy.appendChild(paragraph);
            });

            processCarousel.hidden = details.photos.length < 2;
            processDialog.showModal();
            processCarouselTrack.scrollTo({ left: 0, behavior: 'instant' });
            updateProcessCarousel();
        }

        document.querySelectorAll('.process-tab').forEach(button => {
            button.addEventListener('click', () => openProcessDialog(button.dataset.process, button));
        });
        const supportDialog = document.getElementById('support-dialog');
        let supportDialogTrigger = null;
        const openSupportDialog = trigger => {
            if (trigger.id === 'information-menu-support') {
                closeInformationMenu();
                supportDialogTrigger = informationMenuToggle;
            } else {
                supportDialogTrigger = trigger;
            }
            supportDialog.showModal();
        };
        document.getElementById('support-us-button').addEventListener('click', event => {
            openSupportDialog(event.currentTarget);
        });
        document.getElementById('information-menu-support').addEventListener('click', event => {
            openSupportDialog(event.currentTarget);
        });
        supportDialog.querySelector('.process-dialog-close').addEventListener('click', () => supportDialog.close());
        supportDialog.addEventListener('click', event => {
            if (event.target === supportDialog) supportDialog.close();
        });
        supportDialog.addEventListener('close', () => supportDialogTrigger?.focus());
        processDialog.querySelector('.process-dialog-close').addEventListener('click', () => processDialog.close());
        processDialog.addEventListener('click', event => {
            if (event.target === processDialog) processDialog.close();
        });
        processDialog.addEventListener('close', () => processDialogTrigger?.focus());
        processCarouselTrack.addEventListener('scroll', updateProcessCarousel, { passive: true });
        processPreviousButton.addEventListener('click', () => {
            processCarouselTrack.scrollTo({
                left: ((activeProcessSlide - 1 + processCarouselTrack.children.length) % processCarouselTrack.children.length) * processCarouselTrack.clientWidth,
                behavior: 'instant'
            });
            updateProcessCarousel();
        });
        processNextButton.addEventListener('click', () => {
            processCarouselTrack.scrollTo({
                left: ((activeProcessSlide + 1) % processCarouselTrack.children.length) * processCarouselTrack.clientWidth,
                behavior: 'instant'
            });
            updateProcessCarousel();
        });

        function toggleInformationMenu() {
            const isOpen = informationMenuToggle.getAttribute('aria-expanded') === 'true';
            informationMenuToggle.setAttribute('aria-expanded', String(!isOpen));
            informationMenuToggle.setAttribute('aria-label', isOpen ? 'Open information menu' : 'Close information menu');
            informationMenu.hidden = isOpen;
        }

        function closeInformationMenu() {
            informationMenu.hidden = true;
            informationMenuToggle.setAttribute('aria-expanded', 'false');
            informationMenuToggle.setAttribute('aria-label', 'Open information menu');
        }

        document.addEventListener('click', event => {
            if (!informationMenu.hidden &&
                !informationMenu.contains(event.target) &&
                !informationMenuToggle.contains(event.target)) {
                closeInformationMenu();
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && !informationMenu.hidden) {
                closeInformationMenu();
                informationMenuToggle.focus();
            }
        });

        function showTab(name) {
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('tab-' + name).classList.add('active');
            document.querySelector('.tab-btn[data-tab="' + name + '"]').classList.add('active');
            document.body.classList.toggle('media-gallery-active', name === 'media');
            window.scrollTo(0, 0);
            if (name === 'wheel') resizeWheel();
            if (name === 'media') {
                startMediaHeroAutoplay();
                requestAnimationFrame(updateAllMediaCarouselButtons);
            } else stopMediaHeroAutoplay();
            mediaCarouselAutoplay.forEach(({ schedule }) => schedule());
            requestAnimationFrame(updateEventRowVisibility);
        }

        const getScrollFadeItems = () => document.querySelectorAll('.event-row, .lead-card, .legacy-card, .media-photo-card');
        const tabBar = document.querySelector('.tab-bar');
        const updateEventRowVisibility = () => {
            const scrollProgress = Math.min(window.scrollY / 240, 1);
            document.documentElement.style.setProperty('--tab-background-opacity', (0.94 - scrollProgress * 0.36).toFixed(3));
            document.documentElement.style.setProperty('--tab-border-opacity', (1 - scrollProgress).toFixed(3));
            getScrollFadeItems().forEach(item => {
                const bounds = item.getBoundingClientRect();
                const isInView = bounds.top < window.innerHeight * 0.9 &&
                    bounds.bottom > window.innerHeight * 0.1;
                item.classList.toggle('is-visible', isInView);
            });
        };
        window.addEventListener('scroll', updateEventRowVisibility, { passive: true });
        window.addEventListener('resize', updateEventRowVisibility);
        updateEventRowVisibility();

        const competitionYearData = [
            { id: '2025-2026', label: '2025-2026', generation: 'D14', photoOrder: [1, 2, 3, 12, 4, 5, 6, 13, 7, 8, 9, 14, 10, 11] },
            { id: '2024-2025', label: '2024-2025', generation: 'D13', photoCount: 6 },
            { id: '2023-2024', label: '2023-2024', generation: 'D12', photoCount: 5 },
            { id: '2022-2023', label: '2022-2023', generation: 'D11', photoCount: 9 },
            { id: '2021-2022', label: '2021-2022', generation: 'DX', photoCount: 16 },
            { id: '2019-2021', label: '2019-2021', generation: 'D9', photoCount: 8 },
            { id: '2018-2019', label: '2018-2019', generation: 'D8', photoCount: 6 },
            { id: '2016-2017', label: '2016-2017', generation: 'D6', photoCount: 11 },
            { id: '2015-2016', label: '2015-2016', generation: 'D5', photoCount: 8 }
        ].map(({ id, label, generation, photoCount, photoOrder }) => ({
            id,
            label,
            photos: Array.from({ length: photoOrder?.length || photoCount }, (_, index) => {
                const photoNumber = photoOrder?.[index] || index + 1;
                return {
                    src: `gallery-years/${id}/photo-${String(photoNumber).padStart(2, '0')}.jpg`,
                    alt: `Osprey Racing ${generation} car in the ${label} season, photo ${photoNumber}`,
                    title: `${label} Competition`
                };
            })
        }));

        const mediaCategories = [
            {
                id: 'competition',
                label: 'Competition',
                subcategories: competitionYearData
            },
            {
                id: 'testing',
                label: 'Testing Days',
                photos: [
                    { src: 'gallery-test-day.png', alt: 'Osprey Racing car during a testing day', title: 'Testing Day' }
                ]
            },
            {
                id: 'off-track',
                label: 'Off Track Events',
                subcategories: [
                    {
                        id: 'brumos',
                        label: 'Brumos Collection',
                        photos: [
                            { src: 'gallery-brumos.png', alt: 'Osprey Racing car displayed at the Brumos Collection', title: 'Brumos Collection' }
                        ]
                    },
                    {
                        id: 'banquet',
                        label: 'Banquet',
                        photos: [
                            { src: 'gallery-banquet.png', alt: 'Osprey Racing car displayed at the team banquet', title: 'Banquet' }
                        ]
                    },
                    { id: 'other-events', label: 'More Events', photos: [] }
                ]
            },
            { id: 'more', label: 'More', photos: [] }
        ];

        const mediaHeroImage = document.getElementById('media-hero-image');
        const mediaHeroCounter = document.getElementById('media-hero-counter');
        const mediaCategoryTabs = document.getElementById('media-category-tabs');
        const mediaSubcategoryTabs = document.getElementById('media-subcategory-tabs');
        const mediaPhotoGrid = document.getElementById('media-photo-grid');
        const mediaEmptyState = document.getElementById('media-empty-state');
        const mediaViewer = document.getElementById('media-viewer');
        const mediaViewerImage = document.getElementById('media-viewer-image');
        const mediaViewerClose = document.querySelector('.media-viewer-close');
        const competitionCategory = mediaCategories[0];
        const competitionYears = competitionCategory.subcategories;
        competitionCategory.subcategories = [
            {
                id: 'all',
                label: 'All',
                photos: competitionYears.flatMap(year => year.photos),
                groups: competitionYears.map(year => ({ id: year.id, label: year.label, photos: year.photos }))
            },
            ...competitionYears
        ];
        let activeMediaCategory = mediaCategories[0];
        let activeMediaSubcategory = activeMediaCategory.subcategories[0];
        let mediaHeroPhotos = [];
        let activeMediaHeroPhoto = 0;
        let mediaHeroTimer = null;
        let mediaViewerZoomed = false;

        const allMediaPhotos = mediaCategories.flatMap(category =>
            category.subcategories
                ? category.subcategories
                    .filter(subcategory => subcategory.id !== 'all')
                    .flatMap(subcategory => subcategory.photos)
                : category.photos || []
        );
        mediaHeroPhotos = [
            { src: 'gallery-a.png', alt: 'Osprey Racing D14 car #44 parked on campus', title: 'D14 on Campus' },
            { src: 'gallery-b.png', alt: 'Close-up of an Osprey Racing helmet', title: 'Osprey Racing Helmet' },
            { src: 'gallery-c.png', alt: 'Osprey Racing D14 car #44 in the workshop', title: 'D14 in the Workshop' },
            { src: 'gallery-d.png', alt: 'Osprey Racing D14 car #44 driving on campus', title: 'D14 on Track' },
            { src: 'gallery-e.png', alt: 'Osprey Racing D12 car #99 on course', title: 'D12 on Course' },
            { src: 'gallery-f.png', alt: 'Osprey Racing car displayed at a team event', title: 'Osprey Racing Event' }
        ];

        function setMediaHeroPhoto(index) {
            if (!mediaHeroPhotos.length) return;
            activeMediaHeroPhoto = (index + mediaHeroPhotos.length) % mediaHeroPhotos.length;
            mediaHeroCounter.textContent = `${activeMediaHeroPhoto + 1} ▪ ${mediaHeroPhotos.length}`;
            const photo = mediaHeroPhotos[activeMediaHeroPhoto];
            mediaHeroImage.style.opacity = '0.25';
            const nextImage = new Image();
            nextImage.onload = () => {
                mediaHeroImage.src = photo.src;
                mediaHeroImage.alt = photo.alt;
                requestAnimationFrame(() => { mediaHeroImage.style.opacity = '1'; });
            };
            nextImage.onerror = () => {
                mediaHeroImage.style.opacity = '1';
                console.error(`Failed to load media gallery photo: ${photo.src}`);
            };
            nextImage.src = photo.src;
        }

        function startMediaHeroAutoplay() {
            window.clearInterval(mediaHeroTimer);
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            mediaHeroTimer = window.setInterval(() => {
                if (!document.hidden && document.getElementById('tab-media').classList.contains('active')) {
                    setMediaHeroPhoto(activeMediaHeroPhoto + 1);
                }
            }, 5000);
        }

        function stopMediaHeroAutoplay() {
            window.clearInterval(mediaHeroTimer);
            mediaHeroTimer = null;
        }

        function createMediaPhotoCard(photo) {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'media-photo-card';
            card.setAttribute('aria-label', `View photo: ${photo.title}`);
            const image = document.createElement('img');
            image.src = photo.src;
            image.alt = photo.alt;
            image.loading = 'lazy';
            image.decoding = 'async';
            const classifyPhotoOrientation = () => {
                card.classList.toggle('is-portrait', image.naturalHeight > image.naturalWidth);
            };
            image.addEventListener('load', classifyPhotoOrientation);
            if (image.complete) classifyPhotoOrientation();
            const caption = document.createElement('span');
            caption.className = 'media-photo-caption';
            caption.textContent = photo.title;
            card.append(image, caption);
            card.addEventListener('click', () => openMediaViewer(photo));
            return card;
        }

        const mediaCarouselAutoplay = new Map();

        function scrollMediaCarousel(carousel, direction) {
            const track = carousel.querySelector('.media-year-carousel-track');
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (maxScroll <= 1) return;

            if (direction > 0 && track.scrollLeft >= maxScroll - 1) {
                track.scrollTo({ left: 0, behavior: 'instant' });
            } else if (direction < 0 && track.scrollLeft <= 1) {
                track.scrollTo({ left: maxScroll, behavior: 'instant' });
            } else {
                track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
            }
        }

        function renderMediaPhotoGrid(photos, groups = null) {
            mediaCarouselAutoplay.forEach(({ dispose }) => dispose());
            mediaPhotoGrid.replaceChildren();
            mediaCarouselAutoplay.clear();
            mediaEmptyState.hidden = photos.length > 0;
            if (groups) {
                groups.forEach(group => {
                    const section = document.createElement('section');
                    section.className = 'media-year-section';

                    const divider = document.createElement('h3');
                    divider.className = 'media-year-divider';
                    divider.dataset.year = group.id;
                    divider.textContent = group.label;
                    divider.id = `media-year-${group.id}`;

                    const carousel = document.createElement('div');
                    carousel.className = 'media-year-carousel';

                    const track = document.createElement('div');
                    track.className = 'media-year-carousel-track';
                    track.tabIndex = 0;
                    track.setAttribute('role', 'region');
                    track.setAttribute('aria-label', `${group.label} competition photos`);
                    group.photos.forEach(photo => track.appendChild(createMediaPhotoCard(photo)));

                    const previous = document.createElement('button');
                    previous.type = 'button';
                    previous.className = 'media-year-carousel-arrow media-year-carousel-previous';
                    previous.setAttribute('aria-label', `Scroll ${group.label} photos left`);
                    previous.textContent = '‹';

                    const next = document.createElement('button');
                    next.type = 'button';
                    next.className = 'media-year-carousel-arrow media-year-carousel-next';
                    next.setAttribute('aria-label', `Scroll ${group.label} photos right`);
                    next.textContent = '›';

                    previous.addEventListener('click', () => scrollMediaCarousel(carousel, -1));
                    next.addEventListener('click', () => scrollMediaCarousel(carousel, 1));
                    track.addEventListener('scroll', () => updateMediaCarouselButtons(carousel), { passive: true });

                    carousel.append(previous, track, next);
                    section.append(divider, carousel);
                    mediaPhotoGrid.appendChild(section);
                    updateMediaCarouselButtons(carousel);

                    let isVisible = false;
                    let isFocused = false;
                    let isPointerDown = false;
                    let autoScrollTimer = null;
                    const scheduleAutoScroll = () => {
                        window.clearTimeout(autoScrollTimer);
                        if (!isVisible || isFocused || isPointerDown ||
                            !document.getElementById('tab-media').classList.contains('active') ||
                            window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                        autoScrollTimer = window.setTimeout(() => {
                            scrollMediaCarousel(carousel, 1);
                            scheduleAutoScroll();
                        }, 5000);
                    };
                    const observer = new IntersectionObserver(entries => {
                        isVisible = entries.some(entry => entry.isIntersecting);
                        scheduleAutoScroll();
                    });
                    observer.observe(carousel);
                    track.addEventListener('wheel', scheduleAutoScroll, { passive: true });
                    carousel.addEventListener('pointerenter', scheduleAutoScroll);
                    carousel.addEventListener('pointerleave', scheduleAutoScroll);
                    carousel.addEventListener('pointerdown', () => {
                        isPointerDown = true;
                        scheduleAutoScroll();
                    });
                    carousel.addEventListener('pointerup', () => {
                        isPointerDown = false;
                        scheduleAutoScroll();
                    });
                    carousel.addEventListener('focusin', () => {
                        isFocused = true;
                        scheduleAutoScroll();
                    });
                    carousel.addEventListener('focusout', event => {
                        if (!carousel.contains(event.relatedTarget)) {
                            isFocused = false;
                            scheduleAutoScroll();
                        }
                    });
                    mediaCarouselAutoplay.set(carousel, {
                        schedule: scheduleAutoScroll,
                        dispose: () => {
                            window.clearTimeout(autoScrollTimer);
                            observer.disconnect();
                        }
                    });
                });
            } else {
                photos.forEach(photo => mediaPhotoGrid.appendChild(createMediaPhotoCard(photo)));
            }
            requestAnimationFrame(updateEventRowVisibility);
        }

        function updateMediaCarouselButtons(carousel) {
            const track = carousel.querySelector('.media-year-carousel-track');
            const previous = carousel.querySelector('.media-year-carousel-previous');
            const next = carousel.querySelector('.media-year-carousel-next');
            const maxScroll = track.scrollWidth - track.clientWidth;
            previous.disabled = next.disabled = maxScroll <= 1;
        }

        function updateAllMediaCarouselButtons() {
            mediaPhotoGrid.querySelectorAll('.media-year-carousel').forEach(updateMediaCarouselButtons);
        }

        window.addEventListener('resize', updateAllMediaCarouselButtons);

        function selectMediaSubcategory(subcategory) {
            activeMediaSubcategory = subcategory;
            setActiveMediaSubcategory(subcategory.id);
            renderMediaPhotoGrid(subcategory.photos, subcategory.groups || null);
        }

        function setActiveMediaSubcategory(id) {
            activeMediaSubcategory = activeMediaCategory.subcategories.find(item => item.id === id) || activeMediaSubcategory;
            mediaSubcategoryTabs.querySelectorAll('.media-tab-button').forEach(button => {
                button.setAttribute('aria-selected', String(button.dataset.subcategory === id));
            });
        }

        function scrollToCompetitionSection(id) {
            const target = id === 'all'
                ? mediaPhotoGrid
                : mediaPhotoGrid.querySelector(`.media-year-divider[data-year="${id}"]`);
            if (!target) return;
            const stickyOffset = tabBar.getBoundingClientRect().height +
                mediaSubcategoryTabs.getBoundingClientRect().height + 12;
            const top = window.scrollY + target.getBoundingClientRect().top - stickyOffset;
            window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
        }

        function updateActiveCompetitionYear() {
            if (activeMediaCategory.id !== 'competition' || !activeMediaSubcategory) return;

            const stickyOffset = tabBar.getBoundingClientRect().height +
                mediaSubcategoryTabs.getBoundingClientRect().height + 12;
            const firstYear = mediaPhotoGrid.querySelector('.media-year-divider');
            if (!firstYear || mediaPhotoGrid.getBoundingClientRect().top > stickyOffset) {
                setActiveMediaSubcategory('all');
                return;
            }

            let activeYear = 'all';
            mediaPhotoGrid.querySelectorAll('.media-year-divider').forEach(divider => {
                if (divider.getBoundingClientRect().top <= stickyOffset) activeYear = divider.dataset.year;
            });
            setActiveMediaSubcategory(activeYear);
        }

        window.addEventListener('scroll', updateActiveCompetitionYear, { passive: true });
        window.addEventListener('resize', updateActiveCompetitionYear);

        function selectMediaCategory(category) {
            activeMediaCategory = category;
            mediaCategoryTabs.querySelectorAll('.media-tab-button').forEach(button => {
                button.setAttribute('aria-selected', String(button.dataset.category === category.id));
            });
            mediaSubcategoryTabs.classList.toggle('is-sticky', category.id === 'competition');
            mediaSubcategoryTabs.replaceChildren();
            if (category.subcategories) {
                category.subcategories.forEach((subcategory, index) => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'media-tab-button';
                    button.dataset.subcategory = subcategory.id;
                    button.setAttribute('aria-selected', String(index === 0));
                    button.textContent = subcategory.label;
                    button.addEventListener('click', () => {
                        if (category.id === 'competition') {
                            setActiveMediaSubcategory(subcategory.id);
                            scrollToCompetitionSection(subcategory.id);
                        } else {
                            selectMediaSubcategory(subcategory);
                        }
                    });
                    mediaSubcategoryTabs.appendChild(button);
                });
                selectMediaSubcategory(category.subcategories[0]);
            } else {
                activeMediaSubcategory = null;
                mediaSubcategoryTabs.replaceChildren();
                renderMediaPhotoGrid(category.photos || []);
            }
        }

        mediaCategories.forEach((category, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'media-tab-button';
            button.dataset.category = category.id;
            button.setAttribute('aria-selected', String(index === 0));
            button.textContent = category.label;
            button.addEventListener('click', () => selectMediaCategory(category));
            mediaCategoryTabs.appendChild(button);
        });
        setMediaHeroPhoto(0);
        selectMediaCategory(activeMediaCategory);

        function openMediaViewer(photo) {
            mediaViewerImage.classList.remove('is-zoomed');
            mediaViewerZoomed = false;
            mediaViewerImage.src = photo.src;
            mediaViewerImage.alt = photo.alt;
            mediaViewer.showModal();
        }

        function closeMediaViewer() {
            mediaViewerImage.classList.remove('is-zoomed');
            mediaViewerZoomed = false;
            mediaViewer.close();
        }

        document.querySelector('.media-hero-previous').addEventListener('click', () => {
            setMediaHeroPhoto(activeMediaHeroPhoto - 1);
        });
        document.querySelector('.media-hero-next').addEventListener('click', () => {
            setMediaHeroPhoto(activeMediaHeroPhoto + 1);
        });

        mediaViewerClose.addEventListener('click', closeMediaViewer);
        mediaViewerImage.addEventListener('click', event => {
            event.stopPropagation();
            mediaViewerZoomed = !mediaViewerZoomed;
            mediaViewerImage.classList.toggle('is-zoomed', mediaViewerZoomed);
        });
        mediaViewer.addEventListener('click', event => {
            if (mediaViewerZoomed) {
                mediaViewerZoomed = false;
                mediaViewerImage.classList.remove('is-zoomed');
                return;
            }
            if (event.target === mediaViewer) closeMediaViewer();
        });

        const legacyGrid = document.getElementById('legacy-grid');
        const legacyDialog = document.getElementById('legacy-dialog');
        const legacyDialogTitle = document.getElementById('legacy-dialog-title');
        const legacyDialogYear = document.getElementById('legacy-dialog-year');
        const legacyDialogSummary = document.getElementById('legacy-dialog-summary');
        const legacyLeadGrid = document.getElementById('legacy-lead-grid');
        const legacyMemberGrid = document.getElementById('legacy-member-grid');
        let legacyDialogTrigger = null;

        // Add generation photos, summaries, and alumni to this list as they become available.
        const legacyCars = [
            {
                name: 'SwoopDie',
                year: '2011-2012',
                cover: 'swoopdie-legacy-cover.png',
                tagline: 'Where it All Began.',
                summary: 'Where it All Began.',
                leaders: [
                    { name: 'Justin Tussey', role: 'Founder', image: 'Justin Tussey.png' },
                    { name: 'Casey Foster', role: 'Captain', image: 'Casey Foster.png' }
                ],
                members: [
                    { name: 'Ben Witten', role: 'Team member', image: 'ben.png' },
                    { name: 'Alexandr Gutoray', role: 'Team member', image: 'Aleksander.png' },
                    { name: 'Danny Driscoll', role: 'Team member', image: 'Danny.png' },
                    { name: 'Evan Hathaway', role: 'Team member', image: 'Evan.png' },
                    ...Array(8).fill(null)
                ]
            },
            { name: 'D2', year: '2012-2013', cover: 'legacy-d2.png' },
            { name: 'D3', year: '2013-2014', cover: 'legacy-d3.png' },
            { name: 'D4', year: '2014-2015', cover: 'legacy-d4.png' },
            { name: 'D5', year: '2015-2016', cover: 'legacy-d5.png' },
            { name: 'D6', year: '2016-2017', cover: 'legacy-d6.png' },
            { name: 'D7', year: '2017-2018', cover: 'legacy-d7.png' },
            { name: 'D8', year: '2018-2019', cover: 'legacy-d8.png' },
            { name: 'D9', year: '2019-2021', cover: 'd9-cover.png' },
            { name: 'DX', year: '2021-2022', cover: 'legacy-dx.png' },
            { name: 'D11', year: '2022-2023', cover: 'legacy-d11.png' },
            { name: 'D12', year: '2023-2024', cover: 'legacy-d12.png' },
            { name: 'D13', year: '2024-2025', cover: 'legacy-d13.png' },
            { name: 'D14', year: '2025-2026', cover: 'd14-cover.png' }
        ];

        const createLegacyPerson = person => {
            if (!person) {
                const placeholder = document.createElement('div');
                placeholder.className = 'legacy-person-empty';
                placeholder.textContent = 'Future alumni entry';
                return placeholder;
            }

            const card = document.createElement('article');
            card.className = 'legacy-person';
            const image = document.createElement('img');
            image.src = person.image;
            image.alt = person.name;
            image.loading = 'lazy';
            image.decoding = 'async';
            const copy = document.createElement('div');
            copy.className = 'legacy-person-copy';
            const name = document.createElement('span');
            name.className = 'legacy-person-name';
            name.textContent = person.name;
            const role = document.createElement('span');
            role.className = 'legacy-person-role';
            role.textContent = person.role;
            copy.append(name, role);
            card.append(image, copy);
            return card;
        };

        const openLegacyDialog = (car, trigger) => {
            legacyDialogTrigger = trigger;
            legacyDialogTitle.textContent = car.name;
            legacyDialogYear.textContent = car.year;
            legacyDialogSummary.textContent = car.summary || 'More history and alumni details coming soon.';
            legacyLeadGrid.replaceChildren();
            legacyMemberGrid.replaceChildren();

            const leaders = car.leaders || [];
            leaders.forEach(person => legacyLeadGrid.appendChild(createLegacyPerson(person)));
            legacyLeadGrid.closest('section').hidden = leaders.length === 0;

            const members = car.members || Array(12).fill(null);
            members.slice(0, 12).forEach(person => legacyMemberGrid.appendChild(createLegacyPerson(person)));
            legacyDialog.showModal();
        };

        legacyCars.forEach(car => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'legacy-card';
            card.setAttribute('aria-label', `Open ${car.name}, ${car.year}`);
            const image = document.createElement('img');
            image.className = 'legacy-card-image';
            image.src = car.cover;
            image.alt = `${car.name} Formula SAE car`;
            image.loading = 'lazy';
            image.decoding = 'async';
            const copy = document.createElement('span');
            copy.className = 'legacy-card-copy';
            const name = document.createElement('span');
            name.className = 'legacy-card-title';
            name.textContent = car.name;
            const year = document.createElement('span');
            year.className = 'legacy-card-year';
            year.textContent = car.year;
            copy.append(name, year);
            if (car.tagline) {
                const tagline = document.createElement('span');
                tagline.className = 'legacy-card-tagline';
                tagline.textContent = car.tagline;
                copy.appendChild(tagline);
            }
            card.append(image, copy);
            card.addEventListener('click', () => openLegacyDialog(car, card));
            legacyGrid.appendChild(card);
        });

        legacyDialog.querySelector('.legacy-dialog-close').addEventListener('click', () => legacyDialog.close());
        legacyDialog.addEventListener('click', event => {
            if (event.target === legacyDialog) legacyDialog.close();
        });
        legacyDialog.addEventListener('close', () => legacyDialogTrigger?.focus());

        const carGrid = document.getElementById('car-grid');
        const carDetail = document.getElementById('car-detail');
        const carDetailTitle = document.getElementById('car-detail-title');
        const carDetailContent = document.getElementById('car-detail-content');
        const carDetailGallery = document.getElementById('car-detail-gallery');
        const carResultsHeading = document.getElementById('car-results-heading');
        const carDetailNote = document.getElementById('car-detail-note');
        const carDetailFootnote = document.getElementById('car-detail-footnote');
        const carSpecs = document.getElementById('car-specs');
        let selectedCarId = null;
        const carModels = Array.from({ length: 15 }, (_, index) => `D${15 - index}`);

        // Add or edit each car's thumbnail, gallery, and specifications here.
        const carDetails = {
            D14: {
                thumbnail: 'OspreyRacingCars/d14-home.png',
                zoomThumbnail: true,
                photos: [],
                resultHeading: '2026 Formula SAE Results · #44',
                specs: [
                    { label: 'Overall', value: '59 / 111' },
                    { label: 'Cost Score', value: '69.8 / 100' },
                    { label: 'Presentation Score', value: '18.7 / 75' },
                    { label: 'Design Score', value: '40.0 / 150' },
                    { label: 'Acceleration Score', value: '65.2 / 100' },
                    { label: 'Skidpad Score', value: '25.4 / 75' },
                    { label: 'Autocross Score', value: '64.5 / 125' },
                    { label: 'Endurance Score', value: '12.0 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '295.6 / 1000', highlight: true }
                ]
            },
            D13: {
                thumbnail: 'OspreyRacingCars/d13-car.png',
                photos: [],
                resultHeading: '2025 Formula SAE Results · #77',
                specs: [
                    { label: 'Overall', value: '41 / 106' },
                    { label: 'Cost Score', value: '61.0 / 100' },
                    { label: 'Presentation Score', value: '51.3 / 75' },
                    { label: 'Design Score', value: '75.0 / 150' },
                    { label: 'Acceleration Score', value: '37.3 / 100' },
                    { label: 'Skidpad Score', value: '37.2 / 75' },
                    { label: 'Autocross Score', value: '67.3 / 125' },
                    { label: 'Endurance Score', value: '98.6 / 275' },
                    { label: 'Efficiency Score', value: '26.4 / 100' },
                    { label: 'Total Score', value: '454.1 / 1000', highlight: true }
                ],
                footnote: 'Placed 1st among all public universities in Florida.'
            },
            D12: {
                thumbnail: 'OspreyRacingCars/d12-car.png',
                photos: [],
                resultHeading: '2024 Formula SAE Results · #99',
                specs: [
                    { label: 'Overall', value: '41 / 108' },
                    { label: 'Cost Score', value: '80.1 / 100' },
                    { label: 'Presentation Score', value: '44.6 / 75' },
                    { label: 'Design Score', value: '70.0 / 150' },
                    { label: 'Acceleration Score', value: '63.6 / 100' },
                    { label: 'Skidpad Score', value: '54.3 / 75' },
                    { label: 'Autocross Score', value: '74.5 / 125' },
                    { label: 'Endurance Score', value: '20.0 / 275' },
                    { label: 'Efficiency Score', value: '18.3 / 100' },
                    { label: 'Total Score', value: '425.3 / 1000', highlight: true }
                ]
            },
            D11: {
                thumbnail: 'OspreyRacingCars/d11-car.png',
                photos: [],
                resultHeading: '2023 Formula SAE Results · #49',
                specs: [
                    { label: 'Overall', value: '75 / 114' },
                    { label: 'Cost Score', value: '62.9 / 100' },
                    { label: 'Presentation Score', value: '34.7 / 75' },
                    { label: 'Design Score', value: '70.0 / 150' },
                    { label: 'Acceleration Score', value: '4.5 / 100' },
                    { label: 'Skidpad Score', value: '26.5 / 75' },
                    { label: 'Autocross Score', value: '40.3 / 125' },
                    { label: 'Endurance Score', value: '8.0 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '246.8 / 1000', highlight: true }
                ]
            },
            D3: {
                thumbnail: 'OspreyRacingCars/d3-car.png',
                photos: [],
                resultHeading: '2014 Formula SAE Results · #52',
                specs: [
                    { label: 'Overall', value: '82 / 107' },
                    { label: 'Cost Score', value: '63.9 / 100' },
                    { label: 'Presentation Score', value: '62.9 / 75' },
                    { label: 'Design Score', value: '60.0 / 150' },
                    { label: 'Acceleration Score', value: '0.0 / 100' },
                    { label: 'Skidpad Score', value: '0.0 / 75' },
                    { label: 'Autocross Score', value: '7.5 / 125' },
                    { label: 'Endurance Score', value: '10.0 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '204.3 / 1000', highlight: true }
                ]
            },
            D4: {
                thumbnail: 'OspreyRacingCars/d4-car.png',
                photos: [],
                resultHeading: '2015 Formula SAE Results · #36',
                specs: [
                    { label: 'Overall', value: '60 / 109' },
                    { label: 'Cost Score', value: '64.7 / 100' },
                    { label: 'Presentation Score', value: '39.8 / 75' },
                    { label: 'Design Score', value: '85.0 / 150' },
                    { label: 'Acceleration Score', value: '28.0 / 100' },
                    { label: 'Skidpad Score', value: '2.5 / 75' },
                    { label: 'Autocross Score', value: '55.8 / 125' },
                    { label: 'Endurance Score', value: '9.0 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '284.8 / 1000', highlight: true }
                ]
            },
            D5: {
                thumbnail: 'OspreyRacingCars/d5-car.png',
                photos: [],
                resultHeading: '2016 Formula SAE Results · #72',
                specs: [
                    { label: 'Overall', value: '102 / 115' },
                    { label: 'Cost Score', value: '60.0 / 100' },
                    { label: 'Presentation Score', value: '35.0 / 75' },
                    { label: 'Design Score', value: '70.0 / 150' },
                    { label: 'Acceleration Score', value: '0.0 / 100' },
                    { label: 'Skidpad Score', value: '0.0 / 75' },
                    { label: 'Autocross Score', value: '0.0 / 125' },
                    { label: 'Endurance Score', value: '0.0 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '165.1 / 1000', highlight: true }
                ]
            },
            D6: {
                thumbnail: 'OspreyRacingCars/d6-car.png',
                photos: [],
                resultHeading: '2017 Formula SAE Results · #40',
                specs: [
                    { label: 'Overall', value: '48 / 109' },
                    { label: 'Cost Score', value: '63.4 / 100' },
                    { label: 'Presentation Score', value: '34.4 / 75' },
                    { label: 'Design Score', value: '55.0 / 150' },
                    { label: 'Acceleration Score', value: '56.8 / 100' },
                    { label: 'Skidpad Score', value: '34.4 / 75' },
                    { label: 'Autocross Score', value: '61.2 / 125' },
                    { label: 'Endurance Score', value: '118.1 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '423.2 / 1000', highlight: true }
                ]
            },
            D7: {
                thumbnail: 'OspreyRacingCars/d7-car.png',
                photos: [],
                resultHeading: '2018 Formula SAE Results · #91',
                specs: [
                    { label: 'Overall', value: '67 / 114' },
                    { label: 'Cost Score', value: '57.0 / 100' },
                    { label: 'Presentation Score', value: '66.9 / 75' },
                    { label: 'Design Score', value: '50.0 / 150' },
                    { label: 'Acceleration Score', value: '56.1 / 100' },
                    { label: 'Skidpad Score', value: '24.4 / 75' },
                    { label: 'Autocross Score', value: '14.9 / 125' },
                    { label: 'Endurance Score', value: '25.0 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '294.3 / 1000', highlight: true }
                ]
            },
            D8: {
                thumbnail: 'OspreyRacingCars/d8-car.png',
                photos: [],
                resultHeading: '2019 Formula SAE Results · #82',
                specs: [
                    { label: 'Overall', value: '98 / 108' },
                    { label: 'Cost Score', value: '65.5 / 100' },
                    { label: 'Presentation Score', value: '34.9 / 75' },
                    { label: 'Design Score', value: '70.0 / 150' },
                    { label: 'Acceleration Score', value: '0.0 / 100' },
                    { label: 'Skidpad Score', value: '0.0 / 75' },
                    { label: 'Autocross Score', value: '0.0 / 125' },
                    { label: 'Endurance Score', value: '0.0 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '170.4 / 1000', highlight: true }
                ]
            },
            D9: {
                thumbnail: 'OspreyRacingCars/d9-car.png',
                photos: [],
                resultHeading: '2021 Formula SAE Results · #88',
                note: 'D9 returned to competition in 2021 after the 2020 FSAE COVID-19 cancellation. No static event scores were recorded.',
                specs: [
                    { label: 'Overall', value: '31 / 40' },
                    { label: 'Acceleration Score', value: '59.9 / 100' },
                    { label: 'Skidpad Score', value: '48.3 / 75' },
                    { label: 'Autocross Score', value: '6.5 / 125' },
                    { label: 'Endurance Score', value: '13.0 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '127.8 / 675', highlight: true }
                ]
            },
            D10: {
                name: 'DX',
                thumbnail: 'OspreyRacingCars/dx-home.png',
                zoomThumbnail: true,
                photos: [],
                resultHeading: '2022 Formula SAE Results · #150',
                specs: [
                    { label: 'Overall', value: '18 / 89' },
                    { label: 'Cost Score', value: '61.1 / 100' },
                    { label: 'Presentation Score', value: '42.9 / 75' },
                    { label: 'Design Score', value: '80.0 / 150' },
                    { label: 'Acceleration Score', value: '37.8 / 100' },
                    { label: 'Skidpad Score', value: '54.8 / 75' },
                    { label: 'Autocross Score', value: '87.8 / 125' },
                    { label: 'Endurance Score', value: '155.1 / 275' },
                    { label: 'Efficiency Score', value: '49.7 / 100' },
                    { label: 'Total Score', value: '569.1 / 1000', highlight: true }
                ]
            },
            D2: {
                thumbnail: 'OspreyRacingCars/d2-car.png',
                photos: [],
                resultHeading: '2013 Formula SAE Results · #47',
                specs: [
                    { label: 'Overall', value: '61 / 104' },
                    { label: 'Cost Score', value: '57.8 / 100' },
                    { label: 'Presentation Score', value: '41.6 / 75' },
                    { label: 'Design Score', value: '60.0 / 150' },
                    { label: 'Acceleration Score', value: '6.9 / 100' },
                    { label: 'Skidpad Score', value: '2.5 / 75' },
                    { label: 'Autocross Score', value: '61.5 / 125' },
                    { label: 'Endurance Score', value: '63.6 / 275' },
                    { label: 'Efficiency Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '293.9 / 1000', highlight: true }
                ]
            },
            D1: {
                name: 'SwoopDie',
                thumbnail: 'OspreyRacingCars/swoopdie.png',
                photos: [],
                resultHeading: 'Formula SAE Final Results',
                specs: [
                    { label: 'Overall', value: '81 / 105' },
                    { label: 'Cost Score', value: '62.7 / 100' },
                    { label: 'Presentation Score', value: '37.9 / 75' },
                    { label: 'Design Score', value: '60.0 / 150' },
                    { label: 'Acceleration Score', value: '3.5 / 100' },
                    { label: 'Skidpad Score', value: '16.1 / 75' },
                    { label: 'Autocross Score', value: '7.5 / 125' },
                    { label: 'Endurance Score', value: '10.0 / 275' },
                    { label: 'Economy Score', value: '0.0 / 100' },
                    { label: 'Total Score', value: '197.6 / 1000', highlight: true }
                ],
            }
        };
        function openCarDetail(carId) {
            if (selectedCarId === carId) {
                closeCarDetail();
                return;
            }

            selectedCarId = carId;
            carGrid.querySelectorAll('.car-tile[data-car-id]').forEach(tile => {
                tile.setAttribute('aria-pressed', String(tile.dataset.carId === carId));
            });
            const details = carDetails[carId];
            carDetailTitle.textContent = details?.name || carId;
            carDetailGallery.replaceChildren();
            carDetailGallery.hidden = !details?.photos?.length;
            carResultsHeading.textContent = details?.resultHeading || '';
            carResultsHeading.hidden = !details?.resultHeading;
            carDetailNote.textContent = details?.note || '';
            carDetailNote.hidden = !details?.note;
            carDetailFootnote.textContent = details?.footnote || '';
            carDetailFootnote.hidden = !details?.footnote;
            carSpecs.replaceChildren();
            carDetailContent.classList.toggle('has-results', Boolean(details?.resultHeading));
            carDetailContent.hidden = !details;

            if (details) {
                (details.photos || []).forEach(photo => {
                    const image = document.createElement('img');
                    image.src = photo.src;
                    image.alt = photo.alt;
                    image.loading = 'lazy';
                    image.decoding = 'async';
                    carDetailGallery.appendChild(image);
                });
                details.specs.forEach(spec => {
                    const card = document.createElement('div');
                    card.className = 'car-spec';
                    if (spec.highlight) card.classList.add('is-highlight');
                    const label = document.createElement('strong');
                    label.textContent = spec.label;
                    const value = document.createElement('span');
                    value.textContent = spec.value;
                    card.append(label, value);
                    carSpecs.appendChild(card);
                });
            }

            carDetail.hidden = false;
            carDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function closeCarDetail() {
            selectedCarId = null;
            carGrid.querySelectorAll('.car-tile[data-car-id]').forEach(tile => {
                tile.setAttribute('aria-pressed', 'false');
            });
            carDetail.hidden = true;
            carDetailContent.hidden = true;
        }

        carModels.forEach(carId => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'car-tile';
            button.dataset.carId = carId;
            button.setAttribute('aria-pressed', 'false');
            const displayName = carDetails[carId]?.name || carId;
            const tileStatus = carId === 'D15' ? 'To Be Announced' : carId === 'D9' ? 'Raced 2021' : '';
            button.setAttribute('aria-label', tileStatus ? `${displayName}, ${tileStatus}` : `Open ${displayName}`);
            const details = carDetails[carId];
            if (carId === 'D15') {
                const image = document.createElement('img');
                image.src = 'OspreyRacingCars/d15-cover.jpeg';
                image.alt = '';
                image.loading = 'lazy';
                image.decoding = 'async';
                button.appendChild(image);
            } else if (details && details.thumbnail) {
                const image = document.createElement('img');
                image.src = details.thumbnail;
                image.alt = '';
                image.loading = 'lazy';
                image.decoding = 'async';
                if (details.zoomThumbnail) {
                    const frame = document.createElement('span');
                    frame.className = 'car-tile-image-frame';
                    frame.appendChild(image);
                    button.appendChild(frame);
                } else {
                    button.appendChild(image);
                }
            }
            if (tileStatus) {
                const status = document.createElement('span');
                status.className = 'car-tile-status';
                status.textContent = tileStatus;
                button.insertBefore(status, button.firstChild);
            }
            const label = document.createElement('span');
            label.className = 'car-tile-label';
            label.textContent = displayName;
            button.appendChild(label);
            button.addEventListener('click', () => openCarDetail(carId));
            carGrid.appendChild(button);
        });

        const viewMoreButton = document.createElement('button');
        viewMoreButton.type = 'button';
        viewMoreButton.className = 'car-tile view-more';
        viewMoreButton.setAttribute('aria-label', 'Show older car models');
        viewMoreButton.setAttribute('aria-expanded', 'false');
        viewMoreButton.setAttribute('aria-controls', 'car-grid');
        viewMoreButton.innerHTML = '<span class="car-tile-label">View more...</span><span class="view-more-hint">Show older models</span>';
        const d1Button = carGrid.querySelector('[data-car-id="D1"]');
        const d2Button = carGrid.querySelector('[aria-label="Open D2"]');
        d1Button.hidden = true;
        d2Button.hidden = true;
        viewMoreButton.addEventListener('click', () => {
            const isExpanded = viewMoreButton.getAttribute('aria-expanded') === 'true';
            d1Button.hidden = isExpanded;
            d2Button.hidden = isExpanded;
            viewMoreButton.setAttribute('aria-expanded', String(!isExpanded));
            viewMoreButton.setAttribute('aria-label', isExpanded ? 'Show older car models' : 'Hide older car models');
            viewMoreButton.querySelector('.car-tile-label').textContent = isExpanded ? 'View more...' : 'View less';
            viewMoreButton.querySelector('.view-more-hint').textContent = isExpanded ? 'Show older models' : 'Hide older models';
        });
        carGrid.insertBefore(viewMoreButton, d2Button);

        document.getElementById('car-detail-back').addEventListener('click', () => {
            closeCarDetail();
        });

        // ---------- Independent 3D model viewers ----------
        const modelLoader = new THREE.GLTFLoader();
        const viewers = {};

        function createModelViewer(holderId) {
            const holder = document.getElementById(holderId);
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x222222);

            const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
            camera.position.set(0, 2, 10);

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(1, 1);
            holder.appendChild(renderer.domElement);

            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enableZoom = true;
            controls.minDistance = 3;
            controls.maxDistance = 40;

            scene.add(new THREE.AmbientLight(0xffffff, 0.7));
            const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
            dirLight.position.set(5, 10, 7);
            scene.add(dirLight);

            return { holder, scene, camera, renderer, controls, model: null };
        }

        viewers.wheel = createModelViewer('wheel-viewer');
        viewers.chassis = createModelViewer('chassis-viewer');
        viewers.additional1 = createModelViewer('model-viewer-1');
        viewers.additional2 = createModelViewer('model-viewer-2');

        const wheelGroup = new THREE.Group();
        wheelGroup.add(new THREE.Mesh(
            new THREE.TorusGeometry(3, 0.8, 16, 100),
            new THREE.MeshStandardMaterial({ color: 0x1753d9, roughness: 0.8 })
        ));
        const hub = new THREE.Mesh(
            new THREE.CylinderGeometry(0.6, 0.6, 0.5, 32),
            new THREE.MeshStandardMaterial({ color: 0xfefefe, metalness: 0.8, roughness: 0.2 })
        );
        hub.rotation.x = Math.PI / 2;
        wheelGroup.add(hub);

        const spokeGeometry = new THREE.BoxGeometry(0.3, 2.0, 0.2);
        const spokeMaterial = new THREE.MeshStandardMaterial({ color: 0xfefefe, metalness: 0.6, roughness: 0.3 });
        for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2) / 5;
            const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
            spoke.position.set(Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, 0);
            spoke.rotation.z = angle + Math.PI / 2;
            wheelGroup.add(spoke);
        }
        viewers.wheel.scene.add(wheelGroup);

        function disposeModel(model) {
            model.traverse(object => {
                if (!object.isMesh) return;
                object.geometry.dispose();
                const materials = Array.isArray(object.material) ? object.material : [object.material];
                materials.forEach(material => {
                    Object.values(material).forEach(value => {
                        if (value && value.isTexture) value.dispose();
                    });
                    material.dispose();
                });
            });
        }

        function fitModel(model, viewer, size = 5) {
            model.updateMatrixWorld(true);
            const bounds = new THREE.Box3().setFromObject(model);
            const dimensions = bounds.getSize(new THREE.Vector3());
            const center = bounds.getCenter(new THREE.Vector3());
            const largestDimension = Math.max(dimensions.x, dimensions.y, dimensions.z);
            if (!Number.isFinite(largestDimension) || largestDimension <= 0) {
                throw new Error('The model has no measurable geometry.');
            }

            const fittedModel = new THREE.Group();
            fittedModel.add(model);
            const scale = size / largestDimension;
            fittedModel.scale.setScalar(scale);
            fittedModel.position.copy(center).multiplyScalar(-scale);
            viewer.camera.position.set(0, 2, 10);
            viewer.controls.target.set(0, 0, 0);
            viewer.controls.update();
            return fittedModel;
        }

        function replaceViewerModel(viewer, model, size) {
            const fittedModel = fitModel(model, viewer, size);
            if (viewer.model) {
                viewer.scene.remove(viewer.model);
                disposeModel(viewer.model);
            }
            viewer.model = fittedModel;
            viewer.scene.add(fittedModel);
        }

        function loadModelFile(viewer, file, status) {
            status.textContent = 'Loading model…';
            file.arrayBuffer().then(data => {
                modelLoader.parse(data, '', gltf => {
                    try {
                        replaceViewerModel(viewer, gltf.scene, 5);
                        status.textContent = `${file.name} loaded.`;
                    } catch (error) {
                        status.textContent = `Could not display ${file.name}: ${error.message}`;
                        console.error(`Could not display model ${file.name}:`, error);
                    }
                }, error => {
                    status.textContent = `Could not load ${file.name}. Use a self-contained .glb file.`;
                    console.error(`Failed to load model ${file.name}:`, error);
                });
            }).catch(error => {
                status.textContent = `Could not read ${file.name}.`;
                console.error(`Failed to read model ${file.name}:`, error);
            });
        }

        const chassisStatus = document.getElementById('chassis-status');
        modelLoader.load('D14_COOLER_MASTER.glb', gltf => {
            try {
                replaceViewerModel(viewers.chassis, gltf.scene, 5);
                chassisStatus.textContent = 'D14 Cooler Master loaded. Choose another GLB to replace only this model.';
            } catch (error) {
                chassisStatus.textContent = `Could not display chassis: ${error.message}`;
                console.error('Could not display the D14 Cooler Master model:', error);
            }
        }, undefined, error => {
            chassisStatus.textContent = 'Could not load chassis. Keep the GLB beside this HTML file or choose it below.';
            console.error('Failed to load the D14 Cooler Master model:', error);
        });

        const engineStatus = document.getElementById('model-status-1');
        modelLoader.load('twin_turbo_ls_engine.glb', gltf => {
            try {
                replaceViewerModel(viewers.additional1, gltf.scene, 5);
                engineStatus.textContent = 'Twin Turbo LS engine loaded. Choose another GLB to replace it.';
            } catch (error) {
                engineStatus.textContent = `Could not display engine model: ${error.message}`;
                console.error('Could not display the Twin Turbo LS engine model:', error);
            }
        }, undefined, error => {
            engineStatus.textContent = 'Could not load engine. Keep the GLB beside this HTML file or choose it below.';
            console.error('Failed to load the Twin Turbo LS engine model:', error);
        });

        [
            { inputId: 'chassis-file', viewer: viewers.chassis, statusId: 'chassis-status' },
            { inputId: 'model-file-1', viewer: viewers.additional1, statusId: 'model-status-1' },
            { inputId: 'model-file-2', viewer: viewers.additional2, statusId: 'model-status-2' }
        ].forEach(({ inputId, viewer, statusId }) => {
            const input = document.getElementById(inputId);
            const status = document.getElementById(statusId);
            input.addEventListener('change', () => {
                const [file] = input.files;
                if (file) loadModelFile(viewer, file, status);
            });
        });

        function resizeWheel() {
            Object.values(viewers).forEach(viewer => {
                const width = viewer.holder.clientWidth;
                const height = viewer.holder.clientHeight;
                if (!width || !height) return;
                viewer.camera.aspect = width / height;
                viewer.camera.updateProjectionMatrix();
                viewer.renderer.setSize(width, height);
            });
        }

        function animate() {
            requestAnimationFrame(animate);
            Object.values(viewers).forEach(viewer => {
                viewer.controls.update();
                viewer.renderer.render(viewer.scene, viewer.camera);
            });
        }
        animate();

        window.addEventListener('resize', resizeWheel);
