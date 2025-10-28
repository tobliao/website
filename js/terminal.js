// Terminal Intro Effect
class Terminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.text = document.getElementById('terminal-text');
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';

        this.commandsEn = [
            { cmd: 'whoami', response: 'YuCheng LIAO (Toby)' },
            { cmd: 'cat current_role.txt', response: 'ASIC Design Verification Engineer @ Cisco Systems' },
            { cmd: 'ls skills/', response: 'SystemVerilog  UVM  Python  Docker  Networking  ML' },
            { cmd: 'cat philosophy.txt', response: '"Teaching is the best teacher of learning"' },
            { cmd: 'echo $LOCATION', response: 'Taipei, Taiwan' },
            { cmd: './initialize_resume.sh', response: 'Loading interactive resume...' }
        ];

        this.commandsZh = [
            { cmd: 'whoami', response: '廖育成 (Toby)' },
            { cmd: 'cat 目前職位.txt', response: 'ASIC 設計驗證工程師 @ Cisco Systems' },
            { cmd: 'ls 技能/', response: 'SystemVerilog  UVM  Python  Docker  網路  機器學習' },
            { cmd: 'cat 理念.txt', response: '"教學相長"' },
            { cmd: 'echo $位置', response: '台灣 台北' },
            { cmd: './初始化履歷.sh', response: '載入互動式履歷中...' }
        ];

        this.commands = this.currentLang === 'zh' ? this.commandsZh : this.commandsEn;
        this.currentCommand = 0;

        this.start();
    }

    start() {
        setTimeout(() => this.showAllCommands(), 500);
    }

    showAllCommands() {
        // Show all commands at once with elegant stagger effect instead of typing
        this.commands.forEach((command, index) => {
            setTimeout(() => {
                // Add command line
                const cmdLine = document.createElement('div');
                cmdLine.innerHTML = `<span style="color: #00ff88;">$</span> ${command.cmd}`;
                cmdLine.style.opacity = '0';
                cmdLine.style.transform = 'translateX(-20px)';
                this.output.appendChild(cmdLine);

                // Smooth fade in with slide
                requestAnimationFrame(() => {
                    cmdLine.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                    cmdLine.style.opacity = '1';
                    cmdLine.style.transform = 'translateX(0)';
                });

                // Add response after short delay
                setTimeout(() => {
                    const responseLine = document.createElement('div');
                    responseLine.textContent = command.response;
                    responseLine.style.color = '#a0aec0';
                    responseLine.style.marginBottom = '0.5rem';
                    responseLine.style.opacity = '0';
                    responseLine.style.transform = 'translateX(-10px)';
                    this.output.appendChild(responseLine);

                    requestAnimationFrame(() => {
                        responseLine.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                        responseLine.style.opacity = '1';
                        responseLine.style.transform = 'translateX(0)';
                    });

                    // Scroll to bottom
                    this.output.scrollTop = this.output.scrollHeight;

                    // Hide cursor after last command
                    if (index === this.commands.length - 1) {
                        setTimeout(() => {
                            const cursor = document.querySelector('.cursor');
                            if (cursor) cursor.style.display = 'none';
                        }, 300);
                    }
                }, 200);
            }, index * 600); // Stagger each command-response pair
        });
    }

    updateLanguage(lang) {
        // Terminal already displayed, no need to update
        this.currentLang = lang;
    }
}

// Initialize terminal when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.terminalInstance = new Terminal();
    });
} else {
    window.terminalInstance = new Terminal();
}
