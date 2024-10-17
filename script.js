// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Mock Data in localStorage if not present
  initializeMockData();

  // Handle Job Search Form Submission
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const keyword = document.getElementById('keyword').value.trim();
      const location = document.getElementById('location').value.trim();
      performJobSearch(keyword, location);
    });
  }

  // Handle Post Job Form Submission
  const postJobForm = document.getElementById('post-job-form');
  if (postJobForm) {
    postJobForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const company = document.getElementById('company').value.trim();
      const position = document.getElementById('position').value.trim();
      const location = document.getElementById('location').value.trim();
      const description = document.getElementById('description').value.trim();
      postJob({ company, position, location, description });
    });
  }

  // Handle Business Partner Form Submission
  const partnerForm = document.getElementById('partner-form');
  if (partnerForm) {
    partnerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const partnerName = document.getElementById('partner-name').value.trim();
      const company = document.getElementById('company').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      submitPartnerForm({ partnerName, company, email, message });
    });
  }

  // Display Employer's Posted Jobs
  displayEmployerJobs();
});

// Initialize Mock Data
function initializeMockData() {
  if (!localStorage.getItem('jobs')) {
    const initialJobs = [
      { id: 1, company: 'Tech Solutions', position: 'Software Engineer', location: 'New York', description: 'Develop and maintain web applications.' },
      { id: 2, company: 'Business Corp', position: 'Marketing Manager', location: 'San Francisco', description: 'Lead marketing campaigns and strategies.' },
      { id: 3, company: 'Design Studio', position: 'Graphic Designer', location: 'Los Angeles', description: 'Create visual concepts and designs.' },
    ];
    localStorage.setItem('jobs', JSON.stringify(initialJobs));
  }

  if (!localStorage.getItem('employerJobs')) {
    localStorage.setItem('employerJobs', JSON.stringify([]));
  }

  if (!localStorage.getItem('partnerRequests')) {
    localStorage.setItem('partnerRequests', JSON.stringify([]));
  }
}

// Function to perform job search
function performJobSearch(keyword, location) {
  const jobsContainer = document.getElementById('jobs-container');
  if (!jobsContainer) return;

  const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

  // Filter jobs based on keyword and location
  const filteredJobs = jobs.filter(job => {
    return (
      job.position.toLowerCase().includes(keyword.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  });

  // Clear previous results
  jobsContainer.innerHTML = '';

  if (filteredJobs.length === 0) {
    jobsContainer.innerHTML = '<p>No jobs found matching your criteria.</p>';
    return;
  }

  // Display filtered jobs
  filteredJobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');

    jobCard.innerHTML = `
      <h3>${job.position}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.description}</p>
      <button class="btn apply-btn" data-job-id="${job.id}">Apply</button>
    `;

    jobsContainer.appendChild(jobCard);
  });

  // Add event listeners to Apply buttons
  const applyButtons = document.querySelectorAll('.apply-btn');
  applyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const jobId = button.getAttribute('data-job-id');
      applyForJob(jobId);
    });
  });
}

// Function to handle job application (Simulation)
function applyForJob(jobId) {
  alert('Thank you for your application! This functionality is not implemented yet.');
}

// Function to handle job posting
function postJob(jobData) {
  const employerJobs = JSON.parse(localStorage.getItem('employerJobs')) || [];
  const newJob = {
    id: Date.now(),
    company: jobData.company,
    position: jobData.position,
    location: jobData.location,
    description: jobData.description
  };
  employerJobs.push(newJob);
  localStorage.setItem('employerJobs', JSON.stringify(employerJobs));

  // Also add to the general jobs list
  const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  jobs.push(newJob);
  localStorage.setItem('jobs', JSON.stringify(jobs));

  alert('Job Posted Successfully!');
  document.getElementById('post-job-form').reset();
  displayEmployerJobs();
}

// Function to display employer's posted jobs
function displayEmployerJobs() {
  const employerJobsContainer = document.getElementById('employer-jobs-container');
  if (!employerJobsContainer) return;

  const employerJobs = JSON.parse(localStorage.getItem('employerJobs')) || [];

  employerJobsContainer.innerHTML = '';

  if (employerJobs.length === 0) {
    employerJobsContainer.innerHTML = '<p>You have not posted any jobs yet.</p>';
    return;
  }

  employerJobs.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.classList.add('posted-job-card');

    jobCard.innerHTML = `
      <h3>${job.position}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p>${job.description}</p>
    `;

    employerJobsContainer.appendChild(jobCard);
  });
}

// Function to handle business partner form submission
function submitPartnerForm(partnerData) {
  const partnerRequests = JSON.parse(localStorage.getItem('partnerRequests')) || [];
  const newRequest = {
    id: Date.now(),
    name: partnerData.partnerName,
    company: partnerData.company,
    email: partnerData.email,
    message: partnerData.message
  };
  partnerRequests.push(newRequest);
  localStorage.setItem('partnerRequests', JSON.stringify(partnerRequests));

  alert(`Thank you, ${partnerData.partnerName}! Your partnership request has been submitted.`);
  document.getElementById('partner-form').reset();
}
