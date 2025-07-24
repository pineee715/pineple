document.querySelector('.menu-icon').addEventListener('click', function (event) {
    event.stopPropagation();
    document.querySelector('.menu-dialog').showModal();
});

document.querySelector('.menu-dialog .close-btn').addEventListener('click', function () {
    document.querySelector('.menu-dialog').close();
});

document.querySelector('.menu-dialog').addEventListener('click', function (event) {
    if (event.target === this) {
        this.close();
    }
});

document.getElementById('report-issue-link').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('languageModal').showModal();
});

document.querySelector('.report-dialog .close-btn').addEventListener('click', function () {
    document.querySelector('.report-dialog').close();
});

document.querySelector('.report-dialog').addEventListener('click', function (event) {
    if (event.target === this) {
        this.close();
    }
});

document.getElementById('languageModal').addEventListener('click', function (event) {
    if (event.target === this) {
        selectLanguage('id');
        this.close();
    }
});

document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const appCards = document.querySelectorAll('.app-card');

    appCards.forEach(card => {
        const appName = card.getAttribute('data-name').toLowerCase();
        if (appName.includes(searchTerm)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('active');
        }, index * 100);
    });
});

document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', function (event) {
        event.preventDefault();
        const path = this.getAttribute('data-path');
        if (path) {
            window.location.href = path;
        }
    });
});

const formSection = document.getElementById('formSection');
const aboutSection = document.getElementById('aboutSection');
const formLink = document.getElementById('formLink');
const aboutLink = document.getElementById('aboutLink');
const indicator = document.querySelector('.nav-container .indicator');
const requestForm = document.getElementById('requestForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const requestInput = document.getElementById('request');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const requestError = document.getElementById('requestError');
const content = document.getElementById('content');
const languageModal = document.getElementById('languageModal');

const BOT_TOKEN = 'YOUR_VALID_BOT_TOKEN';
const CHAT_ID_1 = '-100YOUR_PRIVATE_CHAT_ID';
const CHAT_ID_2 = '-100YOUR_PUBLIC_CHAT_ID';

const translations = {
    id: {
        formLink: "Formulir",
        aboutLink: "Cara Mengisi",
        formTitle: "Formulir Laporan",
        aboutTitle: "Cara Mengisi Formulir",
        nameLabel: "Nama Lengkap:",
        nameError: "Nama wajib diisi",
        emailLabel: "Email:",
        emailError: "Email wajib diisi dengan format yang benar",
        requestLabel: "Deskripsi Laporan",
        requestError: "Deskripsi wajib diisi",
        linksLabel: "Links Example (opsional):",
        submitButton: "Kirim Laporan",
        formInstructions: [
            "Masukkan nama lengkap Anda pada kolom \"Nama Lengkap\".",
            "Isi alamat email yang valid pada kolom \"Email\" untuk menerima konfirmasi.",
            "Jelaskan masalah atau laporan Anda secara rinci pada kolom \"Deskripsi Laporan\".",
            "(Opsional) Tambahkan tautan pendukung, seperti tangkapan layar, pada kolom \"Links Example\".",
            "Klik tombol \"Kirim Laporan\" untuk mengirim laporan Anda ke admin."
        ],
        successMessage: (name, email) => `Terima kasih ${name}! Laporan Anda telah dikirim ke admin via Telegram. Jika disetujui, Anda akan menerima konfirmasi melalui email ${email}.`,
        errorMessage: "Gagal mengirim laporan. Silakan coba lagi nanti.",
        telegramMessageFull: (name, email, request, links) => 
            `⚠️ Laporan Baru ⚠️\n👤 Nama: ${name}\n📧 Email: ${email}\n📝 Deskripsi: ${request}\n🔗 Link: ${links}`,
        telegramMessagePublic: (name, request, links) => 
            `⚠️ Laporan Baru ⚠️\n👤 Nama: ${name}\n📝 Deskripsi: ${request}\n🔗 Link: ${links}`,
        telegramLink: "Lihat Semua Permintaan di Channel Telegram"
    },
    en: {
        formLink: "Form",
        aboutLink: "How to Fill",
        formTitle: "Report Form",
        aboutTitle: "How to Fill the Form",
        nameLabel: "Full Name:",
        nameError: "Name is required",
        emailLabel: "Email:",
        emailError: "Email is required and must be in a valid format",
        requestLabel: "Report Description",
        requestError: "Description is required",
        linksLabel: "Example Links (optional):",
        submitButton: "Submit Report",
        formInstructions: [
            "Enter your full name in the \"Full Name\" field.",
            "Provide a valid email address in the \"Email\" field to receive confirmation.",
            "Describe your issue or report in detail in the \"Report Description\" field.",
            "(Optional) Add supporting links, such as screenshots, in the \"Example Links\" field.",
            "Click the \"Submit Report\" button to send your report to the admin."
        ],
        successMessage: (name, email) => `Thank you ${name}! Your report has been sent to the admin via Telegram. If approved, you will receive a confirmation via email at ${email}.`,
        errorMessage: "Failed to send request. Please try again later.",
        telegramMessageFull: (name, email, request, links) => 
            `⚠️ New Report ⚠️\n👤 Name: ${name}\n📧 Email: ${email}\n📝 Description: ${request}\n🔗 Link: ${links}`,
        telegramMessagePublic: (name, request, links) => 
            `⚠️ New Report ⚠️\n👤 Name: ${name}\n📝 Description: ${request}\n🔗 Link: ${links}`,
        telegramLink: "View All Requests on Telegram Channel"
    }
};

let currentLanguage = 'id';

function updateIndicator(target) {
    const rect = target.getBoundingClientRect();
    const containerRect = document.querySelector('.nav-container').getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - containerRect.left}px`;
}

function showForm() {
    formSection.style.display = 'flex';
    aboutSection.style.display = 'none';
    formLink.classList.add('active');
    aboutLink.classList.remove('active');
    updateIndicator(formLink);
}

function showAbout() {
    formSection.style.display = 'none';
    aboutSection.style.display = 'block';
    formLink.classList.remove('active');
    aboutLink.classList.add('active');
    updateIndicator(aboutLink);
}

function selectLanguage(lang) {
    currentLanguage = lang;
    const t = translations[lang];
    document.documentElement.lang = lang;
    formLink.textContent = t.formLink;
    aboutLink.textContent = t.aboutLink;
    document.getElementById('formTitle').textContent = t.formTitle;
    document.getElementById('aboutTitle').textContent = t.aboutTitle;
    document.getElementById('nameLabel').textContent = t.nameLabel;
    document.getElementById('nameError').textContent = t.nameError;
    document.getElementById('emailLabel').textContent = t.emailLabel;
    document.getElementById('emailError').textContent = t.emailError;
    document.getElementById('requestLabel').textContent = t.requestLabel;
    document.getElementById('requestError').textContent = t.requestError;
    document.getElementById('linksLabel').textContent = t.linksLabel;
    document.getElementById('submitButton').textContent = t.submitButton;

    const instructionsList = document.getElementById('formInstructions');
    instructionsList.innerHTML = '';
    t.formInstructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });

    languageModal.close();
    document.querySelector('.report-dialog').showModal();
    showForm();
}

async function sendToTelegram(chatId, message) {
    if (encodeURIComponent(message).length > 4096) {
        console.error(`Pesan ke ${chatId} terlalu panjang`);
        return false;
    }
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(`Respons dari Telegram untuk ${chatId}:`, data);
        if (!response.ok) {
            throw new Error(`Telegram API error: ${data.description || 'Unknown error'}`);
        }
        console.log(`Pesan berhasil dikirim ke ${chatId}`);
        return true;
    } catch (error) {
        console.error(`Gagal mengirim ke ${chatId}:`, error.message);
        return false;
    }
}

formLink.addEventListener('click', function (e) {
    e.preventDefault();
    showForm();
});

aboutLink.addEventListener('click', function (e) {
    e.preventDefault();
    showAbout();
});

requestForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    let isValid = true;

    nameError.style.display = 'none';
    emailError.style.display = 'none';
    requestError.style.display = 'none';

    if (!nameInput.value.trim()) {
        nameError.style.display = 'block';
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
        emailError.style.display = 'block';
        isValid = false;
    }

    if (!requestInput.value.trim()) {
        requestError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        const name = nameInput.value;
        const email = emailInput.value;
        const request = requestInput.value;
        const links = document.getElementById('links').value || (currentLanguage === 'id' ? 'Tidak ada link disertakan' : 'No links provided');
        
        const fullMessage = translations[currentLanguage].telegramMessageFull(name, email, request, links);
        const publicMessage = translations[currentLanguage].telegramMessagePublic(name, request, links);

        const responseDiv = document.getElementById('response');
        const sentToBidzz = await sendToTelegram(CHAT_ID_1, fullMessage);
        const sentToMembers = await sendToTelegram(CHAT_ID_2, publicMessage);
        
        if (sentToBidzz && sentToMembers) {
            responseDiv.textContent = translations[currentLanguage].successMessage(name, email);
            responseDiv.className = 'success';
        } else {
            responseDiv.textContent = `Gagal mengirim laporan: ${!sentToBidzz ? 'Gagal ke grup privat' : ''} ${!sentToMembers ? 'Gagal ke grup publik' : ''}`;
            responseDiv.className = 'error';
        }
        responseDiv.style.display = 'block';
        
        this.reset();
    }
});

window.addEventListener('resize', () => {
    if (formLink.classList.contains('active')) {
        updateIndicator(formLink);
    } else {
        updateIndicator(aboutLink);
    }
});

document.querySelector('#languageModal .close-btn').addEventListener('click', function () {
    selectLanguage('id');
    languageModal.close();
});