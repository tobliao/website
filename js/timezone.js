// Time Zone Clock Manager
class TimezoneClocks {
    constructor() {
        this.clocks = document.querySelectorAll('.timezone-time');
        this.init();
    }

    init() {
        if (this.clocks.length === 0) return;

        // Update immediately
        this.updateClocks();

        // Update every minute
        setInterval(() => {
            this.updateClocks();
        }, 60000);
    }

    updateClocks() {
        this.clocks.forEach(clock => {
            const timezone = clock.dataset.timezone;
            if (timezone) {
                const time = this.getTimeForTimezone(timezone);
                clock.textContent = time;
            }
        });
    }

    getTimeForTimezone(timezone) {
        try {
            const now = new Date();
            const options = {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            return new Intl.DateTimeFormat('en-US', options).format(now);
        } catch (e) {
            return '--:--';
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.timezoneClocks = new TimezoneClocks();
    });
} else {
    window.timezoneClocks = new TimezoneClocks();
}
