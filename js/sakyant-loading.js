(() => {
    const MIN_LOADING_MS = 900;
    const MAX_WAIT_MS = 6000;

    const startedAt = performance.now();
    let finished = false;

    const lockToTop = () => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    };

    const fillProgress = () => {
        const progressFill = document.getElementById('progressFill');
        if (!progressFill) return;

        requestAnimationFrame(() => {
            progressFill.style.transition = 'width 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
            progressFill.style.width = '82%';
        });
    };

    const completeProgress = () => {
        const progressFill = document.getElementById('progressFill');
        if (!progressFill) return;
        progressFill.style.transition = 'width 0.25s ease-out';
        progressFill.style.width = '100%';
    };

    const closeLoading = () => {
        if (finished) return;
        finished = true;

        const overlay = document.getElementById('loadingOverlay');
        if (!overlay) return;

        completeProgress();

        setTimeout(() => {
            overlay.style.opacity = '0';
            document.body.classList.remove('loading-active');

            setTimeout(() => {
                overlay.classList.remove('active');
                overlay.style.display = 'none';
                window.dispatchEvent(new Event('pageLoadComplete'));
                window.dispatchEvent(new Event('sakyantReady'));
            }, 420);
        }, 160);
    };

    const scheduleClose = () => {
        const elapsed = performance.now() - startedAt;
        const remaining = Math.max(MIN_LOADING_MS - elapsed, 0);
        setTimeout(closeLoading, remaining);
    };

    const init = () => {
        lockToTop();
        fillProgress();

        window.addEventListener('pageshow', (e) => {
            lockToTop();
            if (e.persisted) {
                scheduleClose();
            }
        }, { passive: true });

        if (document.readyState === 'complete') {
            scheduleClose();
        } else {
            window.addEventListener('load', scheduleClose, { once: true, passive: true });
        }

        setTimeout(scheduleClose, MAX_WAIT_MS);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
