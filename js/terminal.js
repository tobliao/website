// Terminal Intro Effect with Interactive Commands
class Terminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.text = document.getElementById('terminal-text');
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isInteractive = false;

        this.commandsEn = [
            { cmd: 'whoami', response: 'YuCheng LIAO (Toby)' },
            { cmd: 'cat current_role.txt', response: 'ASIC Design Verification Engineer @ Cisco Systems' },
            { cmd: 'ls skills/', response: 'SystemVerilog  UVM  Python  Docker  Networking  ML' },
            { cmd: 'cat philosophy.txt', response: '"Teaching is the best teacher of learning"' },
            { cmd: 'echo $LOCATION', response: 'Taipei, Taiwan' },
            { cmd: './initialize_resume.sh', response: 'Loading interactive resume...' }
        ];

        this.commandsZh = [
            { cmd: 'whoami', response: '廖昱程 (Toby)' },
            { cmd: 'cat 目前職位.txt', response: 'ASIC 設計驗證工程師 @ Cisco Systems' },
            { cmd: 'ls 技能/', response: 'SystemVerilog  UVM  Python  Docker  網路  機器學習' },
            { cmd: 'cat 理念.txt', response: '"教學相長"' },
            { cmd: 'echo $位置', response: '台灣 台北' },
            { cmd: './初始化履歷.sh', response: '載入互動式履歷中...' }
        ];

        // Easter egg commands
        this.easterEggsEn = {
            'ls -la': 'drwxr-xr-x  10 toby  staff   320 Oct 29 2025 .\ndrwxr-xr-x  15 toby  staff   480 Oct 28 2025 ..\n-rw-r--r--   1 toby  staff  1337 Oct 29 2025 .secrets\n-rwxr-xr-x   1 toby  staff  4096 Oct 29 2025 awesome_code.sv\n-rw-r--r--   1 toby  staff   256 Oct 28 2025 coffee.txt',
            'cat .secrets': '🤫 Secret: I debug with print statements sometimes...\n✨ Achievement: 100% code coverage (eventually)\n🎯 Hidden skill: Can solder SMD components\n💡 Fun fact: I once wrote a haiku in SystemVerilog comments',
            'sudo make coffee': 'Error: Permission denied. \n(Also, this terminal doesn\'t support Java... ☕)',
            'ping google.com': 'PING google.com (142.250.185.46): 56 data bytes\n64 bytes from 142.250.185.46: icmp_seq=0 ttl=117 time=2.043 ms\n--- Connection stable ---',
            'git status': 'On branch main\nYour branch is up to date.\n\nnothing to commit, working tree clean\n✨ All bugs have been fixed!',
            'git log': 'commit abc123 (HEAD -> main)\nAuthor: Toby <toby@cisco.com>\nDate:   Oct 29 2025\n\n    feat: Add another awesome feature\n    \n    Coverage: 100% ✓\n    Tests: All passing ✓',
            'cat coffee.txt': '☕ Coffee levels: [████████░░] 80%\n🔋 Energy: High\n💻 Productivity: Maximum\n⚡ Status: Ready to debug!',
            'uname -a': 'TobyOS 1.0 Professional x86_64 GNU/Linux\nBuilt with: SystemVerilog, Coffee, and Determination',
            'history': 'Try these commands:\n  ls -la\n  cat .secrets\n  sudo make coffee\n  git status\n  cat coffee.txt\n  help',
            'help': 'Available commands:\n  whoami, ls, cat, echo, pwd, date\n  git status, git log\n  ping, uname, history, clear\n  sudo make coffee (try it!)\n  \nType any command and press Enter!',
            'clear': '__CLEAR__',
            'pwd': '/home/toby/resume/interactive',
            'date': new Date().toLocaleString(),
            'vim': 'Starting vim...\nJust kidding! Use :q to exit.\n(You\'re already in the best editor - your browser!)',
            ':q': 'vim: command not found\n(Nice try though! 😄)',
            'python': 'Python 3.11.5\n>>> print("Hello, World!")\nHello, World!\n>>> exit()',
            'coverage': '📊 Code Coverage Report:\n━━━━━━━━━━━━━━━━━━━━━━\nFunctional: 98.7% ✓\nCode: 99.2% ✓\nAssertion: 97.5% ✓\n━━━━━━━━━━━━━━━━━━━━━━\nStatus: PASS ✨'
        };

        this.easterEggsZh = {
            'ls -la': 'drwxr-xr-x  10 toby  staff   320 2025年10月29日 .\ndrwxr-xr-x  15 toby  staff   480 2025年10月28日 ..\n-rw-r--r--   1 toby  staff  1337 2025年10月29日 .秘密\n-rwxr-xr-x   1 toby  staff  4096 2025年10月29日 厲害的代碼.sv\n-rw-r--r--   1 toby  staff   256 2025年10月28日 咖啡.txt',
            'cat .secrets': '🤫 秘密：我有時候用 print 除錯...\n✨ 成就：100% 程式碼覆蓋率（最終）\n🎯 隱藏技能：會焊接 SMD 元件\n💡 趣事：我曾在 SystemVerilog 註解中寫過俳句',
            'cat .秘密': '🤫 秘密：我有時候用 print 除錯...\n✨ 成就：100% 程式碼覆蓋率（最終）\n🎯 隱藏技能：會焊接 SMD 元件\n💡 趣事：我曾在 SystemVerilog 註解中寫過俳句',
            'sudo make coffee': '錯誤：權限不足。\n（而且，這個終端機不支援 Java... ☕）',
            'help': '可用指令：\n  whoami, ls, cat, echo, pwd, date\n  git status, git log\n  ping, uname, history, clear\n  sudo make coffee（試試看！）\n  \n輸入任何指令並按 Enter！',
            'clear': '__CLEAR__',
            'pwd': '/home/toby/履歷/互動式',
            'date': new Date().toLocaleString('zh-TW'),
            'coverage': '📊 程式碼覆蓋率報告：\n━━━━━━━━━━━━━━━━━━━━━━\n功能覆蓋率：98.7% ✓\n程式碼覆蓋率：99.2% ✓\n斷言覆蓋率：97.5% ✓\n━━━━━━━━━━━━━━━━━━━━━━\n狀態：通過 ✨'
        };

        this.commands = this.currentLang === 'zh' ? this.commandsZh : this.commandsEn;
        this.easterEggs = this.currentLang === 'zh' ? this.easterEggsZh : this.easterEggsEn;
        this.currentCommand = 0;

        this.start();
    }

    start() {
        setTimeout(() => {
            this.showAllCommands();
            setTimeout(() => this.enableInteractiveMode(), this.commands.length * 600 + 1000);
        }, 500);
    }

    showAllCommands() {
        // Show all commands at once with elegant stagger effect instead of typing
        this.commands.forEach((command, index) => {
            setTimeout(() => {
                // Add command line
                const cmdLine = document.createElement('div');
                cmdLine.innerHTML = `<span style="color: #ffffff;">$</span> ${command.cmd}`;
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
                }, 200);
            }, index * 600); // Stagger each command-response pair
        });
    }

    enableInteractiveMode() {
        this.isInteractive = true;

        // Show hint
        const hint = document.createElement('div');
        hint.textContent = this.currentLang === 'zh' ? '\n💡 提示：輸入 "help" 查看更多指令！' : '\n💡 Hint: Type "help" for more commands!';
        hint.style.color = '#666';
        hint.style.fontSize = '0.85rem';
        hint.style.marginTop = '1rem';
        hint.style.opacity = '0';
        this.output.appendChild(hint);

        requestAnimationFrame(() => {
            hint.style.transition = 'opacity 0.5s ease-out';
            hint.style.opacity = '1';
        });

        // Create input field
        const inputContainer = document.querySelector('.terminal-input');
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.style.display = 'none';

        // Create actual input
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'terminal-cmd-input';
        input.style.cssText = `
            background: transparent;
            border: none;
            color: #fff;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            outline: none;
            flex: 1;
            caret-color: #fff;
        `;
        input.placeholder = 'Type a command...';
        inputContainer.appendChild(input);

        // Handle command input
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value.trim();
                if (cmd) {
                    this.handleCommand(cmd);
                    this.commandHistory.push(cmd);
                    this.historyIndex = this.commandHistory.length;
                    input.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    input.value = this.commandHistory[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    input.value = this.commandHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.commandHistory.length;
                    input.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                // Simple tab completion
                const availableCommands = Object.keys(this.easterEggs);
                const matches = availableCommands.filter(c => c.startsWith(input.value));
                if (matches.length === 1) {
                    input.value = matches[0];
                }
            }
        });

        // Focus input
        input.focus();

        // Refocus on terminal click
        document.querySelector('.terminal-window').addEventListener('click', () => {
            input.focus();
        });
    }

    handleCommand(cmd) {
        // Display command
        const cmdLine = document.createElement('div');
        cmdLine.innerHTML = `<span style="color: #ffffff;">$</span> ${cmd}`;
        cmdLine.style.marginTop = '1rem';
        this.output.appendChild(cmdLine);

        // Get response
        let response = this.easterEggs[cmd];

        if (response === '__CLEAR__') {
            // Clear terminal
            setTimeout(() => {
                this.output.innerHTML = '';
            }, 100);
            return;
        }

        if (!response) {
            // Check for partial matches or default commands
            if (cmd.startsWith('echo ')) {
                response = cmd.substring(5);
            } else if (cmd.startsWith('cat ')) {
                response = this.currentLang === 'zh'
                    ? `cat: ${cmd.substring(4)}: 找不到檔案`
                    : `cat: ${cmd.substring(4)}: No such file`;
            } else if (cmd.startsWith('ls ')) {
                response = 'skills/  projects/  experience/  education/  contact/';
            } else {
                response = this.currentLang === 'zh'
                    ? `${cmd}: 指令找不到\n💡 輸入 "help" 查看可用指令`
                    : `${cmd}: command not found\n💡 Type "help" for available commands`;
            }
        }

        // Display response
        const responseLine = document.createElement('div');
        responseLine.textContent = response;
        responseLine.style.color = '#a0aec0';
        responseLine.style.marginBottom = '0.5rem';
        responseLine.style.whiteSpace = 'pre-wrap';
        this.output.appendChild(responseLine);

        // Scroll to bottom
        this.output.scrollTop = this.output.scrollHeight;
    }

    updateLanguage(lang) {
        this.currentLang = lang;
        this.commands = lang === 'zh' ? this.commandsZh : this.commandsEn;
        this.easterEggs = lang === 'zh' ? this.easterEggsZh : this.easterEggsEn;
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
