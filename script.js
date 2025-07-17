// Gunakan provider asli dari MetaMask
const ethereum = window.ethereum;
let selectedTicket = { type: '', value: '', event: '' };
let selectedPaymentMethod = "";

const eventsData = {
  event1: {
    title: "Ruang Bermusik 2025",
    date: "19-20 Juli 2025",
    duration: "2 hari",
    location: "Tasikmalaya",
    image: "img/event.jpg",
    description: "Ruang Bermusik 2025 di Tasikmalaya dengan Perunggu, Lomba Sihir, dll.",
    prices: [
      { type: "Early Bid Special - 2 Day Pass", value: "IDR 100.000" },
      { type: "Normal - 2 Day Pass (19-20 Juli 2025)", value: "IDR 200.000" },
      { type: "Presale 1 - 2 Day Pass (19-20 Juli 2025)", value: "IDR 150.000" }
    ]
  },
  event2: {
    title: "La La Land in the concert",
    date: "26 Juli 2025",
    duration: "1 hari",
    location: "JIExpo Kemayoran.",
    image: "img/event1.jpg",
    description: "Pertunjukan ini menghidupkan kembali film La La Land karya Damien Chazelle...",
    prices: [
      { type: "SEBASTIAN SEAT", value: "IDR 900.000" },
      { type: "BILL SEAT", value: "IDR 1.200.000" },
      { type: "GREG SEAT", value: "IDR 1.450.000" },
      { type: "LAURA SEAT", value: "IDR 1.700.000" },
      { type: "KEITH SEAT", value: "IDR 1.950.000" },
      { type: "MIA SEAT", value: "IDR 2.150.000" }
    ]
  },
  event3: {
    title: "RI-FEST 2025",
    date: "15-17 Agustus 2025",
    duration: "3 hari",
    location: "Parkir Barat Jiexpo Kemayoran",
    image: "img/event3.jpg",
    description: "RI-Fest adalah festival musik dan budaya...",
    prices: [
      { type: "Promo Blind Ticket (3 Day Pass)", value: "IDR 80.000" },
      { type: "Tiket Masuk Duluan (Sebelum 16.00 WIB)", value: "IDR 90.000" },
      { type: "Tiket Early Bird (3 Day Pass)", value: "IDR 150.000" },
      { type: "Tiket VIP (3 Day Pass)", value: "IDR 450.000" },
      { type: "Tiket VIP Lounge Upper Deck (3 Day Pass)", value: "IDR 1.350.000" }
    ]
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('event-modal');
  const purchaseModal = document.getElementById('purchase-modal');

  // Tampilkan detail event
  document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
      const eventId = button.dataset.eventId;
      const event = eventsData[eventId];
      selectedTicket.event = event.title;

      document.querySelector('#event-modal img').src = event.image;
      document.querySelector('#event-modal h2').textContent = event.title;
      document.getElementById('event-date').textContent = event.date;
      document.getElementById('event-duration').textContent = event.duration;
      document.getElementById('event-location').textContent = event.location;
      document.getElementById('event-description').textContent = event.description;

      const ticketContainer = document.getElementById('ticket-prices');
      ticketContainer.innerHTML = '';

      event.prices.forEach((price) => {
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center bg-white px-4 py-2 rounded shadow';
        div.innerHTML = `
          <div>
            <p class="font-medium">${price.type}</p>
            <p class="text-sm text-gray-500">${price.value}</p>
          </div>
          <button class="buy-ticket-btn bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
            data-type="${price.type}" data-value="${price.value}">Beli</button>
        `;
        ticketContainer.appendChild(div);
      });

      modal.classList.remove('hidden');
    });
  });

  // Beli tiket
  document.getElementById('event-modal').addEventListener('click', e => {
    if (e.target.classList.contains('buy-ticket-btn')) {
      selectedTicket.type = e.target.dataset.type;
      selectedTicket.value = e.target.dataset.value;

      document.getElementById('selected-type').textContent = selectedTicket.type;
      document.getElementById('selected-total').textContent = selectedTicket.value;
      document.getElementById('purchase-event-title').textContent = selectedTicket.event;

      modal.classList.add('hidden');
      purchaseModal.classList.remove('hidden');
    }
  });

  // Toggle dan pilih metode pembayaran
  document.querySelectorAll('#purchase-modal .toggle-section').forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
      const content = toggleBtn.nextElementSibling;
      content.classList.toggle('hidden');
    });
  });

  // Tombol-tombol metode pembayaran dalam div (e-Wallet)
  document.querySelectorAll('#purchase-modal .w-full.text-left.p-2').forEach(button => {
    button.addEventListener('click', () => {
      selectedPaymentMethod = button.textContent.trim();

      document.querySelectorAll('#purchase-modal .w-full.text-left.p-2').forEach(btn => {
        btn.classList.remove('bg-blue-200');
      });

      button.classList.add('bg-blue-200');
      console.log("Metode dipilih:", selectedPaymentMethod);
    });
  });

  // Konfirmasi pembelian
  document.getElementById('confirm-purchase-btn')?.addEventListener('click', async () => {
    if (!document.getElementById('terms-check').checked) {
      alert("Kamu harus menyetujui syarat & ketentuan.");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    if (selectedPaymentMethod.toLowerCase().includes("eth")) {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const sender = accounts[0];

        const transactionParameters = {
          to: sender, // Ganti ke alamat tujuan sebenarnya
          from: sender,
          value: '0x2386F26FC10000', // Contoh 0.01 ETH
        };

        await ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });

        alert(`Pembayaran berhasil via Ethereum dari ${sender} untuk tiket "${selectedTicket.type}".`);
      } catch (err) {
        console.error(err);
        alert('Transaksi gagal.');
      }
    } else {
      alert(`Pembelian menggunakan ${selectedPaymentMethod} untuk tiket "${selectedTicket.type}" telah berhasil!.`);
    }

    purchaseModal.classList.add('hidden');
  });
});

// Simple dynamic pricing simulation
        document.addEventListener('DOMContentLoaded', function() {
            // Simulate price changes for demonstration
            setInterval(function() {
                const priceElements = document.querySelectorAll('.dynamic-price');
                priceElements.forEach(el => {
                    const basePrice = parseInt(el.getAttribute('data-base'));
                    const variation = Math.floor(Math.random() * 20) - 10; // +/- $10 variation
                    const newPrice = Math.max(basePrice - 20, basePrice + variation); // Don't go below base - $20
                    el.textContent = '$' + newPrice;
                });
            }, 5000);
            
            // Simple chart initialization placeholder
            if (document.getElementById('price-chart')) {
                // In a real implementation, this would use a charting library like Chart.js
                // For this demo, we'll just show a placeholder image
                document.getElementById('price-chart').innerHTML = `
                    <img src="img/event.jpg" alt="Sample price chart showing dynamic pricing trends over time for event tickets" style="width: 100%; height: 100%; object-fit: cover;">
                `;
            }
            
            // Demo KYC verification flow
            const verifyButtons = document.querySelectorAll('button:contains("Get Verified")');
            verifyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    alert('In a live implementation, this would launch our secure KYC verification flow with identity document upload and biometric verification.');
                });
            });
            
            // Event filtering - placeholder functionality
            const eventFilterButtons = document.querySelectorAll('#events button:not(.dynamic-price)');
            eventFilterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    eventFilterButtons.forEach(btn => btn.classList.remove('bg-indigo-600', 'text-white'));
                    // Add active class to clicked button
                    this.classList.add('bg-indigo-600', 'text-white');
                    // In a real implementation, this would filter the events
                });
            });
        });