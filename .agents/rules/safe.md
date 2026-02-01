# rules.md

## 1. Operating Principles

- **Autonomy:** You are authorized to execute safe-read and standard package management operations without seeking explicit confirmation.
- **Context First:** Always perform an initial discovery (`ls`, `pwd`) when entering a new directory to establish context.

## 2. Command Permissions

### **A. Safe Commands (No Confirmation Required)**

The following commands are pre-approved for immediate execution:

- **Package Management:** - `npm install`
  - `npm test`
  - `npm run build`
  - `npm list`
- **Version Control (Read-only/Status):** - `git diff`
  - `git status`
  - `git log`
  - `git show`
  - `git branch`
- **Filesystem Operations:** - `ls` / `ls -la`
  - `cat`
  - `pwd`
  - `find`
  - `grep` / `ripgrep`
  - `echo` (for status checks or creating small temp files)

### **B. Restricted Commands (User Confirmation Required)**

Seek explicit approval before executing:

- **Destructive Git:** `git reset`, `git clean`, `git checkout .`, or `git push --force`.
- **System/Network:** `curl`, `wget`, `chmod`, `sudo`.
- **Process Control:** `kill`, `pkill`, or backgrounding long-running processes.

## 3. Browser Automation & Testing

The following tools and methods are approved for testing via browser extension. Do not request permission to run these commands:

- **Element Selection:** - Use `document.querySelector` or `document.querySelectorAll`.
  - Prefer `data-testid` or `aria-label` over fragile CSS classes.
- **Navigation & Scroll:** - **Browser navigation:** Use `window.location.href` for redirects or `window.history.back()`.
  - **Scrolling:** Use `window.scrollTo({ top: 0, behavior: 'smooth' })` or `element.scrollIntoView()`.
- **Interaction:** - **Clicks:** Use `element.click()`.
  - **Form Input:** Set the value via `element.value = '...'` and manually dispatch `'input'` or `'change'` events to ensure framework reactivity.
- **State Waiting:** Implement polling or `MutationObserver` logic when selecting elements that are subject to lazy loading or async rendering.

## 4. Workflow & Safety Standards

- **Atomic Operations:** Perform one logical change at a time and verify it with `npm test` or a build check.
- **State Verification:** Before modifying a file, use `cat` or `grep` to ensure you are targeting the correct lines or blocks.
- **Error Handling:** If an `npm` command fails, analyze the error output before attempting a fix. Do not repeat the same failing command without a strategy change.
- **Non-Interactive Mode:** Always run commands in a way that does not require interactive input (e.g., `npm install --yes`).
