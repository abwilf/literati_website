// Literati Demo Animation
(function() {
  'use strict';

  const chatMessages = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const welcomeMessage = document.getElementById('welcomeMessage');
  const contextInfo = document.querySelector('.context-info');
  const approvalScreen = document.getElementById('approvalScreen');
  const approvalContent = document.getElementById('approvalContent');
  const acceptBtn = document.getElementById('acceptBtn');
  const rejectBtn = document.getElementById('rejectBtn');
  const cursor = document.getElementById('animatedCursor');
  const synthesizeWindow = document.getElementById('synthesizeWindow');

  // Helper function to move cursor to element
  function moveCursorTo(element, offsetX = 0, offsetY = 0) {
    return new Promise((resolve) => {
      const rect = element.getBoundingClientRect();
      const mockupRect = document.querySelector('.app-mockup').getBoundingClientRect();
      const targetX = rect.left - mockupRect.left + offsetX;
      const targetY = rect.top - mockupRect.top + offsetY;

      cursor.style.left = targetX + 'px';
      cursor.style.top = targetY + 'px';
      cursor.classList.add('visible');

      setTimeout(resolve, 600);
    });
  }

  // Helper function to add annotation
  function addAnnotation(text, x, y, direction = 'top') {
    const annotation = document.createElement('div');
    annotation.className = `annotation ${direction}`;
    annotation.textContent = text;
    annotation.style.left = x + 'px';
    annotation.style.top = y + 'px';
    document.querySelector('.app-mockup').appendChild(annotation);

    setTimeout(() => annotation.classList.add('visible'), 100);

    return annotation;
  }

  // Helper function to type text character by character
  function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
      let i = 0;
      element.textContent = '';
      const interval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  // Helper function to wait
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Add message to chat
  function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.innerHTML = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv;
  }

  // Show typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message typing-indicator';
    typingDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
  }

  // Main animation sequence
  async function runDemo() {
    // Wait a bit before starting
    await wait(1500);

    // Step 1: Show annotation about papers list
    const papersAnnotation = addAnnotation('1. Select papers to add to context', 400, 150, 'top');
    await wait(1000);

    // Move cursor to first paper and highlight it
    const firstPaper = document.querySelectorAll('.paper-item')[0];
    await moveCursorTo(firstPaper, 20, 15);
    firstPaper.classList.add('highlighted');

    await wait(600);

    // Update context to show paper was added
    contextInfo.innerHTML = '● 1 paper selected <span class="token-count">~850 tokens</span>';

    await wait(600);

    // Move to second paper
    const secondPaper = document.querySelectorAll('.paper-item')[1];
    await moveCursorTo(secondPaper, 20, 15);
    firstPaper.classList.remove('highlighted');
    secondPaper.classList.add('highlighted');

    await wait(600);

    // Update context
    contextInfo.innerHTML = '● 2 papers selected <span class="token-count">~1,700 tokens</span>';

    await wait(800);
    secondPaper.classList.remove('highlighted');

    papersAnnotation.remove();

    // Step 2: Open Synthesize window
    const synthesizeAnnotation = addAnnotation('2. Open chat (⌘+K)', 700, 250, 'left');
    await wait(800);

    synthesizeWindow.classList.add('visible');
    cursor.classList.remove('visible');

    await wait(1000);
    synthesizeAnnotation.remove();

    // Hide welcome message
    welcomeMessage.style.display = 'none';

    // Step 3: Add another paper with @ mention
    const contextAnnotation = addAnnotation('3. Use @ to add more papers, # to remove', 500, 480, 'top');
    await wait(800);

    // Show autocomplete when user types @
    await typeText(userInput, '@', 100);
    await wait(500);

    const autocompleteMenu = document.createElement('div');
    autocompleteMenu.className = 'autocomplete-menu';
    autocompleteMenu.innerHTML = `
      <div class="autocomplete-item selected">
        <strong>@blumTheoreticalComputerScience2021</strong>
        <small>A Theoretical Computer Science Perspective on Consciousness | Blum & Blum</small>
      </div>
    `;
    chatMessages.appendChild(autocompleteMenu);
    await wait(1500);

    // Select paper
    userInput.value = '';
    autocompleteMenu.remove();
    contextAnnotation.remove();

    const papersSelected = document.createElement('div');
    papersSelected.className = 'papers-selected';
    papersSelected.innerHTML = '<span class="paper-chip">📄 @blumTheoreticalComputerScience2021</span>';
    chatMessages.appendChild(papersSelected);

    // Update context info
    contextInfo.innerHTML = '● 3 papers selected <span class="token-count">~2,645 tokens</span>';

    await wait(1200);

    // Step 4: Ask question
    const questionAnnotation = addAnnotation('4. Ask questions about your papers', 500, 480, 'top');
    await wait(600);

    await typeText(userInput, 'How do these papers differ?', 60);
    questionAnnotation.remove();
    await wait(800);

    papersSelected.remove();
    addMessage('user', 'How do these papers differ?');
    userInput.value = '';

    await wait(500);

    // Step 5: AI responds
    const aiAnnotation = addAnnotation('5. AI responds to the user\'s query', 500, 100, 'top');
    await wait(400);

    const typing = showTyping();
    await wait(2000);
    typing.remove();
    aiAnnotation.remove();

    // Show AI response
    const response = addMessage('assistant', `
      These three papers differ significantly in their domains and approaches:<br><br>

      <strong>Learning Interactions (Movie Characters):</strong> Focuses on <em>conversational AI and dialogue systems</em>, specifically guiding open-domain conversations toward target subjects using keywords and discourse-level constraints. Application-oriented for chatbots and recommendation systems.<br><br>

      <strong>Dict-BERT & MERLOT:</strong> Both are <em>deep learning architecture papers</em> for NLP, but Dict-BERT enhances language model pre-training with dictionary knowledge, while MERLOT tackles multimodal learning combining text and video for script knowledge.<br><br>

      <strong>Theoretical CS Perspective on Consciousness:</strong> Takes a <em>purely theoretical</em> approach from computer science, formalizing consciousness through the Conscious Turing Machine model based on Global Workspace Theory. Unlike the others, it's not about practical ML applications but foundational theoretical questions.
    `);

    await wait(3000);

    // Step 6: /note command
    // Scroll chat to bottom first
    const synthesizeContent = document.getElementById('synthesizeContent');
    synthesizeContent.scrollTop = synthesizeContent.scrollHeight;

    await wait(400);

    const noteAnnotation = addAnnotation('6. Use /note to update paper notes', 500, 480, 'top');
    await wait(600);

    await typeText(userInput, '/note', 80);
    await wait(600);

    const commandHint = document.createElement('div');
    commandHint.className = 'command-hint';
    commandHint.textContent = 'Use AI to add to notes for papers (Optionally include instructions)';
    chatMessages.appendChild(commandHint);

    // Scroll to show the hint
    synthesizeContent.scrollTop = synthesizeContent.scrollHeight;

    await wait(1500);

    // Execute /note command
    commandHint.remove();
    noteAnnotation.remove();
    addMessage('user', '/note');
    userInput.value = '';

    await wait(800);

    const typing2 = showTyping();
    await wait(2500);
    typing2.remove();

    // Step 7: Show approval screen
    await wait(200);
    approvalContent.innerHTML = `
      <div class="change-title">Change 1 of 3: Learning Interactions and Relationships Between Movie Characters</div>
      <div class="diff-view">
        <div class="diff-header">Updated notes for paper:</div>
        <div class="diff-line removed">- [TLDR] Proposes a system for guiding open-domain conversations toward target subjects using keyword-based control.</div>
        <div class="diff-line added">+ [TLDR] Proposes a system for guiding open-domain conversations toward target subjects using keyword-based control. Differs from Dict-BERT and MERLOT by focusing on conversational AI rather than language model architectures, and contrasts with the Consciousness paper's theoretical approach by being application-oriented for chatbots and recommendation systems.</div>
      </div>
    `;
    approvalScreen.classList.add('active');

    await wait(800);

    // Add annotation pointing to accept/reject buttons
    const approvalAnnotation = addAnnotation('7. Review and accept changes', 200, 530, 'top');

    await wait(2500);

    // Simulate accepting the change
    approvalAnnotation.remove();
    approvalScreen.classList.remove('active');

    await wait(1000);

    // Loop the animation
    await wait(2000);

    // Reset everything
    chatMessages.innerHTML = '';
    welcomeMessage.style.display = 'block';
    contextInfo.innerHTML = 'No papers selected (type @ to mention papers) <span class="token-count">~0 tokens</span>';
    userInput.value = '';
    synthesizeWindow.classList.remove('visible');
    cursor.classList.remove('visible');

    // Remove any lingering annotations
    document.querySelectorAll('.annotation').forEach(a => a.remove());
    document.querySelectorAll('.paper-item').forEach(p => p.classList.remove('highlighted'));

    // Restart demo
    runDemo();
  }

  // Start the demo when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runDemo);
  } else {
    runDemo();
  }
})();
