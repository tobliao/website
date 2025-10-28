// Terminal Intro Effect
class Terminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.text = document.getElementById('terminal-text');
        this.commands = [
            { cmd: 'whoami', response: 'YuCheng LIAO (Toby)' },
            { cmd: 'cat current_role.txt', response: 'ASIC Design Verification Engineer @ Cisco Systems' },
            { cmd: 'ls skills/', response: 'SystemVerilog  UVM  Python  Docker  Networking  ML' },
            { cmd: 'cat philosophy.txt', response: '"Teaching is the best teacher of learning"' },
            { cmd: 'echo $LOCATION', response: 'Taipei, Taiwan' },
            { cmd: './initialize_resume.sh', response: 'Loading interactive resume...' }
        ];
        this.currentCommand = 0;
        this.currentChar = 0;
        this.isTyping = false;
        this.typingSpeed = 80;
        this.deleteSpeed = 40;
        this.pauseAfterCommand = 600;
        this.pauseAfterResponse = 1200;

        this.start();
    }

    start() {
        setTimeout(() => this.typeCommand(), 1000);
    }

    typeCommand() {
        if (this.currentCommand >= this.commands.length) {
            return;
        }

        this.isTyping = true;
        const cmd = this.commands[this.currentCommand].cmd;

        if (this.currentChar < cmd.length) {
            this.text.textContent = cmd.substring(0, this.currentChar + 1);
            this.currentChar++;
            setTimeout(() => this.typeCommand(), this.typingSpeed);
        } else {
            setTimeout(() => this.executeCommand(), this.pauseAfterCommand);
        }
    }

    executeCommand() {
        const cmd = this.commands[this.currentCommand].cmd;
        const response = this.commands[this.currentCommand].response;

        // Add command to output
        const cmdLine = document.createElement('div');
        cmdLine.innerHTML = `<span style="color: #00ff88;">$</span> ${cmd}`;
        this.output.appendChild(cmdLine);

        // Add response to output
        const responseLine = document.createElement('div');
        responseLine.textContent = response;
        responseLine.style.color = '#a0aec0';
        responseLine.style.marginBottom = '0.5rem';
        this.output.appendChild(responseLine);

        // Scroll to bottom
        this.output.scrollTop = this.output.scrollHeight;

        // Clear input
        this.text.textContent = '';
        this.currentChar = 0;
        this.currentCommand++;

        if (this.currentCommand < this.commands.length) {
            setTimeout(() => this.typeCommand(), this.pauseAfterResponse);
        } else {
            // All commands done, hide terminal cursor
            setTimeout(() => {
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.style.display = 'none';
            }, 1000);
        }
    }
}

// Initialize terminal when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Terminal();
    });
} else {
    new Terminal();
}
