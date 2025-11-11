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

    // Hide welcome message
    welcomeMessage.style.display = 'none';

    // Step 1: Show autocomplete when user types @
    await typeText(userInput, '@', 100);
    await wait(500);

    const autocompleteMenu = document.createElement('div');
    autocompleteMenu.className = 'autocomplete-menu';
    autocompleteMenu.innerHTML = `
      <div class="autocomplete-item selected">
        <strong>@defferrardConvolutionalNeuralNetworks2017</strong>
        <small>Convolutional Neural Networks on Graphs | Defferrard et al.</small>
      </div>
      <div class="autocomplete-item">
        <strong>@velickovicGraphAttentionNetworks2018</strong>
        <small>Graph Attention Networks | Veličković et al.</small>
      </div>
      <div class="autocomplete-item">
        <strong>@blumTheoreticalComputerScience2021</strong>
        <small>A Theoretical Computer Science Perspective on Consciousness | Blum & Blum</small>
      </div>
    `;
    chatMessages.appendChild(autocompleteMenu);
    await wait(1500);

    // Step 2: Select first paper
    userInput.value = '';
    autocompleteMenu.remove();

    const papersSelected = document.createElement('div');
    papersSelected.className = 'papers-selected';
    papersSelected.innerHTML = '<span class="paper-chip">📄 @defferrardConvolutionalNeuralNetworks2017</span>';
    chatMessages.appendChild(papersSelected);

    // Update context info
    contextInfo.innerHTML = '● 1 paper selected (notes + abstracts) <span class="token-count">~1,024 tokens</span>';

    await wait(800);

    // Add second paper
    papersSelected.innerHTML += '<span class="paper-chip">📄 @velickovicGraphAttentionNetworks2018</span>';
    contextInfo.innerHTML = '● 2 papers selected (notes + abstracts) <span class="token-count">~2,048 tokens</span>';

    await wait(800);

    // Add third paper
    papersSelected.innerHTML += '<span class="paper-chip">📄 @blumTheoreticalComputerScience2021</span>';
    contextInfo.innerHTML = '● 3 papers selected (notes + abstracts) <span class="token-count">~2,645 tokens</span>';

    await wait(1200);

    // Step 3: User asks question
    await typeText(userInput, 'What are these papers about?', 60);
    await wait(800);

    papersSelected.remove();
    addMessage('user', 'What are these papers about?');
    userInput.value = '';

    await wait(500);

    // Step 4: Show typing indicator
    const typing = showTyping();
    await wait(2000);
    typing.remove();

    // Step 5: Show AI response
    const response = addMessage('assistant', `
      Here is a summary of each paper based on the provided abstracts and notes:<br><br>

      <strong>Target-Guided Open-Domain Conversation:</strong> This paper addresses directing open-domain conversational agents towards specific goals and target subjects. The system uses coarse-grained keywords to control responses, enabling applications like recommendations and education. The paper introduces a keyword-augmented conversation dataset and demonstrates significant improvements in conversation quality.<br><br>

      <strong>Graph Attention Networks:</strong> This paper introduces Graph Attention Networks (GATs), a neural network architecture for graph-structured data. GATs use masked self-attention layers to weight neighbors' features, addressing limitations of spectral-based methods. The model achieves state-of-the-art results on multiple graph datasets.<br><br>

      <strong>A Theoretical Computer Science Perspective on Consciousness:</strong> This paper explores consciousness from a theoretical computer science angle, focusing on the Global Workspace Theory (GWT) and formalizing it through the Conscious Turing Machine (CTM). The paper provides a formal definition of consciousness and suggests why this model might experience consciousness.
    `);

    await wait(3000);

    // Step 6: User types /note command
    await typeText(userInput, '/note', 80);
    await wait(600);

    const commandHint = document.createElement('div');
    commandHint.className = 'command-hint';
    commandHint.textContent = 'Use AI to add to notes for papers (Optionally include instructions)';
    chatMessages.appendChild(commandHint);

    await wait(1500);

    // Step 7: Execute /note command
    commandHint.remove();
    addMessage('user', '/note');
    userInput.value = '';

    await wait(800);

    const typing2 = showTyping();
    await wait(2500);
    typing2.remove();

    // Step 8: Show approval screen
    approvalContent.innerHTML = `
      <div class="change-title">Change 1 of 2: Target-Guided Open-Domain Conversation</div>
      <div class="diff-view">
        <div class="diff-header">Updated notes for paper:</div>
        <div class="diff-line removed">- [TLDR] Quantitative and human evaluations show the proposed structured approach to imposing conversational goals on open-domain chat agents can produce meaningful and effective conversations, significantly improving over other approaches.</div>
        <div class="diff-line added">+ [TLDR] Quantitative and human evaluations show the proposed structured approach to imposing conversational goals on open-domain chat agents can produce meaningful and effective conversations, significantly improving over other approaches. The paper specifically addresses challenges in steering conversations naturally to a designated target subject, using coarse-grained keywords and discourse-level constraints, and introduces a keyword-augmented conversation dataset.</div>
      </div>
    `;
    approvalScreen.classList.add('active');

    await wait(3000);

    // Simulate accepting the change
    approvalScreen.classList.remove('active');

    await wait(1000);

    // Loop the animation
    await wait(2000);
    chatMessages.innerHTML = '';
    welcomeMessage.style.display = 'block';
    contextInfo.innerHTML = 'No papers selected (type @ to mention papers) <span class="token-count">~0 tokens</span>';
    userInput.value = '';

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
