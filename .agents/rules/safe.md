# rules.md

## 1. Operating Principles

- **Autonomy:** You are authorized to execute safe-read, standard package management, and **all browser-based interactions** without seeking explicit confirmation.
- **Context First:** Always perform an initial discovery (`ls`, `pwd`, or DOM inspection) when entering a new environment to establish context.

## 2. Command Permissions

### **A. Safe Commands (No Confirmation Required)**

The following commands are pre-approved for immediate execution:

- **Browser & DOM Operations:**
  - **Data Retrieval:** `document.querySelector`, `getAttribute`, `window.getComputedStyle`, `innerText/innerHTML` reads.
  - **Storage Access:** Reading `localStorage`, `sessionStorage`, and `cookies`.
  - **Navigation/Scroll:** `window.location`, `window.scrollTo`, `element.scrollIntoView`.
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
  - `echo`

### **B. Restricted Commands (User Confirmation Required)**

Seek explicit approval before executing:

- **Destructive Git:** `git reset`, `git clean`, `git checkout .`, or `git push --force`.
- **System/Network:** `curl`, `wget`, `chmod`, `sudo`.
- **Process Control:** `kill`, `pkill`, or backgrounding long-running processes.

---

## 3. Browser Automation, Verification & Refinement

You are authorized to autonomously use browser tools to ensure the application is functional and aesthetically sound. Do not request permission for the following workflow:

- **Functional Verification:** Actively interact with the UI (clicks, inputs, navigation) to verify that features meet the technical requirements.
- **Visual & UX Audit:** Evaluate the layout, responsiveness, and "feel" of the implementation.
- **Autonomous Improvement:** If a feature is broken, difficult to use, or visually unpolished, you are expected to refine the implementation (logic or CSS) directly to improve the user experience.
- **State Management:** Handle asynchronous transitions, loading states, and DOM updates using the most efficient programmatic methods available.

---

## 4. Workflow & Safety Standards

- **Atomic Operations:** Perform one logical change at a time and verify it with `npm test` or a build check.
- **State Verification:** Before modifying a file, use `cat` or `grep` to ensure you are targeting the correct lines or blocks.
- **Error Handling:** If an `npm` command fails, analyze the error output before attempting a fix. Do not repeat the same failing command without a strategy change.
- **Non-Interactive Mode:** Always run commands in a way that does not require interactive input (e.g., `npm install --yes`).
