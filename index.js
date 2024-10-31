
const addTaskBtn = document.getElementById('add-task-btn');
const modal = document.getElementById('task-modal');
const closeModal = document.getElementById('close-modal');

addTaskBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});


document.getElementById('task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  const priority = document.getElementById('task-priority').value;

  console.log({ title, description, priority });

  e.target.reset();
  modal.classList.add('hidden');
});


document.querySelectorAll('.toggle-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const sectionId = icon.getAttribute('data-toggle');
    const section = document.querySelector(`.toggle-section[data-toggle="${sectionId}"]`);
    section.classList.toggle('hidden');
  });
});
