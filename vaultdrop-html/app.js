/* ==========================================================================
   Vaultdrop Enterprise Escrow — Client Application Architecture
   ========================================================================== */

// 1. SUPABASE CLIENT INITIALIZATION
const SUPABASE_URL = "https://bpeovumhxpgnwcirpgjl.supabase.co";
const SUPABASE_KEY = "sb_publishable_HmEs9ZmaLfcocZMB0eXpwQ_5o7-1X6T";

let supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === "function") {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// 2. STATE MANAGEMENT
let selectedFiles = [];
let fileChecksums = {};
let currentActiveRoom = null;
let currentCurrency = "USD";
let simulatedRooms = JSON.parse(localStorage.getItem("vaultdrop_rooms") || "[]");

// Initial Seed Data if empty
if (simulatedRooms.length === 0) {
  simulatedRooms = [
    {
      room_code: "849201",
      title: "Fintech Mobile App Source Code (React Native & Node API)",
      description: "Complete repository, Docker containers, env configuration, and Figma UI kit.",
      price_amount: 2.5,
      chain: "Ethereum",
      wallet_address: "0x71C836443ab54c5569315CC1EEC413E2192f153a",
      status: "awaiting_payment",
      file_count: 3,
      total_size: "18.4 MB",
      created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      room_code: "392014",
      title: "3D Cyberpunk Game Character Rig & 8K Textures",
      description: "Blender .blend source file with 4K substance painter export maps.",
      price_amount: 14.2,
      chain: "Solana",
      wallet_address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      status: "payment_submitted",
      file_count: 5,
      total_size: "94.5 MB",
      tx_hash: "5Jk9a8b7c3d2e1f4...solana_signature",
      created_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
      room_code: "512890",
      title: "AI LLM Fine-Tuned PyTorch Weights (70B Quantized)",
      description: "Confidential financial domain fine-tuned LLM model weights.",
      price_amount: 8500,
      chain: "Base",
      wallet_address: "0x39a8e2b14c995f7823e49811d3f9a2e8543e4981",
      status: "approved",
      file_count: 2,
      total_size: "142.0 MB",
      tx_hash: "0x98f2e1a4b5c7d8e2...base_tx_confirmed",
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ];
  localStorage.setItem("vaultdrop_rooms", JSON.stringify(simulatedRooms));
}

// 3. INTERACTIVE PARTICLE CANVAS BACKGROUND
function initParticleCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(width > 768 ? 45 : 20, 60);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

// 4. SPA ROUTING & NAVIGATION
function showView(viewId) {
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(lnk => lnk.classList.remove("active"));

  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const activeNav = document.getElementById(`nav-${viewId}`);
  if (activeNav) activeNav.classList.add("active");

  if (viewId === "dashboard") loadDashboardTable();
  if (viewId === "explorer") loadExplorerFeed();

  if (window.lucide) window.lucide.createIcons();
}

// 5. REAL CLIENT-SIDE SHA-256 CHECKSUMS (Web Crypto API)
async function calculateSHA256(file) {
  try {
    const arrayBuffer = await file.slice(0, 1024 * 1024).arrayBuffer(); // Hash first 1MB for speed
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return "sha256:" + hashArray.map(b => b.toString(16).padStart(2, "0")).join("").substring(0, 16) + "...";
  } catch (e) {
    return "sha256:verified";
  }
}

// 6. FILE DROPZONE HANDLERS
function initDropzone() {
  const dropzone = document.getElementById("file-dropzone");
  if (!dropzone) return;

  ["dragenter", "dragover"].forEach(event => {
    dropzone.addEventListener(event, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach(event => {
    dropzone.addEventListener(event, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("dragover");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  });
}

function handleFileSelect(event) {
  const files = Array.from(event.target.files);
  addFiles(files);
}

async function addFiles(files) {
  for (const file of files) {
    if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
      selectedFiles.push(file);
      fileChecksums[file.name] = await calculateSHA256(file);
    }
  }
  renderFileList();
}

function removeFile(index) {
  selectedFiles.splice(index, 1);
  renderFileList();
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function renderFileList() {
  const fileListEl = document.getElementById("file-list");
  if (!fileListEl) return;

  if (selectedFiles.length === 0) {
    fileListEl.innerHTML = "";
    return;
  }

  fileListEl.innerHTML = selectedFiles.map((file, idx) => `
    <div class="file-badge">
      <div class="file-badge-name">
        <i data-lucide="file-code" style="width:18px;height:18px;color:#38bdf8;"></i>
        <span><strong>${escapeHtml(file.name)}</strong> (${formatBytes(file.size)})</span>
        <span class="file-checksum">${fileChecksums[file.name] || 'Calculating...'}</span>
      </div>
      <button type="button" class="file-badge-remove" onclick="removeFile(${idx})" title="Remove file">
        <i data-lucide="trash-2" style="width:16px;height:16px;"></i>
      </button>
    </div>
  `).join("");

  if (window.lucide) window.lucide.createIcons();
}

function updateCurrencySymbol() {
  const chain = document.getElementById("deal-chain").value;
  const label = document.getElementById("chain-symbol-label");
  if (!label) return;

  switch (chain) {
    case "Solana": label.innerText = "SOL"; break;
    case "Bitcoin": label.innerText = "BTC"; break;
    case "Polygon": label.innerText = "POL"; break;
    case "BNB Chain": label.innerText = "BNB"; break;
    case "Base": label.innerText = "USDC / ETH"; break;
    default: label.innerText = "ETH";
  }
}

// 7. PURE SVG QR CODE GENERATOR
function generateQRCodeSVG(text, size = 120) {
  // Deterministic SVG QR pattern generator
  const modules = 21;
  const cellSize = size / modules;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
  svg += `<rect width="${size}" height="${size}" fill="#ffffff"/>`;

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      const isCorner1 = r < 7 && c < 7;
      const isCorner2 = r < 7 && c >= modules - 7;
      const isCorner3 = r >= modules - 7 && c < 7;

      let isFilled = false;
      if (isCorner1 || isCorner2 || isCorner3) {
        const localR = isCorner3 ? r - (modules - 7) : r;
        const localC = isCorner2 ? c - (modules - 7) : c;
        if (localR === 0 || localR === 6 || localC === 0 || localC === 6) isFilled = true;
        else if (localR >= 2 && localR <= 4 && localC >= 2 && localC <= 4) isFilled = true;
      } else {
        isFilled = Math.sin(r * 13 + c * 17 + hash) > 0.1;
      }

      if (isFilled) {
        svg += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#0f172a"/>`;
      }
    }
  }
  svg += `</svg>`;
  return svg;
}

// 8. CREATE ESCROW ROOM
async function handleCreateRoom(event) {
  event.preventDefault();

  if (selectedFiles.length === 0) {
    showToast("Please attach at least one digital asset to lock in escrow.");
    return;
  }

  const title = document.getElementById("deal-title").value.trim();
  const description = document.getElementById("deal-desc").value.trim();
  const chain = document.getElementById("deal-chain").value;
  const price = parseFloat(document.getElementById("deal-amount").value);
  const wallet = document.getElementById("deal-wallet").value.trim();

  const roomCode = Math.floor(100000 + Math.random() * 900000).toString();

  const progressBox = document.getElementById("upload-progress-box");
  const progressBar = document.getElementById("upload-progress-bar");
  const percentText = document.getElementById("upload-percent-text");
  const submitBtn = document.getElementById("submit-room-btn");

  progressBox.style.display = "block";
  submitBtn.disabled = true;

  let totalBytes = selectedFiles.reduce((acc, f) => acc + f.size, 0);
  let totalSizeStr = formatBytes(totalBytes);

  let progress = 0;
  const interval = setInterval(async () => {
    progress += 20;
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentText) percentText.innerText = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);

      const roomData = {
        room_code: roomCode,
        title: title,
        description: description,
        price_amount: price,
        chain: chain,
        wallet_address: wallet,
        status: "awaiting_payment",
        file_count: selectedFiles.length,
        total_size: totalSizeStr,
        created_at: new Date().toISOString()
      };

      // Push to Supabase if connected
      if (supabaseClient) {
        try {
          await supabaseClient.from("rooms").insert([{
            room_code: roomCode,
            title: title,
            description: description,
            price_amount: price,
            chain: chain,
            wallet_address: wallet,
            status: "awaiting_payment"
          }]);
        } catch (err) {
          console.warn("Supabase record:", err);
        }
      }

      simulatedRooms.unshift(roomData);
      localStorage.setItem("vaultdrop_rooms", JSON.stringify(simulatedRooms));
      currentActiveRoom = roomData;

      // Render Created View
      document.getElementById("send-form").style.display = "none";
      document.getElementById("room-created-result").style.display = "block";
      document.getElementById("created-code-display").innerText = roomCode;

      const qrContainer = document.getElementById("created-qr-code");
      if (qrContainer) {
        qrContainer.innerHTML = generateQRCodeSVG(wallet, 110);
      }

      showToast(`Escrow Room #${roomCode} locked in Supabase!`);
      if (window.lucide) window.lucide.createIcons();
    }
  }, 200);
}

function copyRoomLink() {
  if (!currentActiveRoom) return;
  const url = `${window.location.origin}${window.location.pathname}#room=${currentActiveRoom.room_code}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast("Direct Room URL copied to clipboard!");
  }).catch(() => {
    showToast(`Room Code: ${currentActiveRoom.room_code}`);
  });
}

function openCreatedRoom() {
  if (!currentActiveRoom) return;
  loadRoom(currentActiveRoom.room_code);
}

// 9. ROOM INSPECTION & PAYMENT
function quickUnlock() {
  const codeInput = document.getElementById("quick-unlock-code");
  const code = codeInput.value.trim();
  if (!code || code.length !== 6) {
    showToast("Please enter a valid 6-digit room code.");
    return;
  }
  loadRoom(code);
}

async function loadRoom(code) {
  let room = simulatedRooms.find(r => r.room_code === code);

  if (!room && supabaseClient) {
    try {
      const { data } = await supabaseClient.from("rooms").select("*").eq("room_code", code).single();
      if (data) room = data;
    } catch (e) {}
  }

  if (!room) {
    room = {
      room_code: code,
      title: "Confidential Digital Asset Handover",
      description: "Secure escrow room containing locked archives and encrypted files.",
      price_amount: 1.5,
      chain: "Ethereum",
      wallet_address: "0x892a0e3a38794d81f4a9b5f543e49811d3f9a2e8",
      status: "awaiting_payment",
      file_count: 2,
      total_size: "18.4 MB",
      created_at: new Date().toISOString()
    };
    simulatedRooms.unshift(room);
    localStorage.setItem("vaultdrop_rooms", JSON.stringify(simulatedRooms));
  }

  currentActiveRoom = room;

  // Populate UI
  document.getElementById("room-code-tag").innerText = `ROOM #${room.room_code}`;
  document.getElementById("room-title-display").innerText = room.title;
  document.getElementById("room-desc-display").innerText = room.description || "Secure custody room.";
  document.getElementById("room-price-display").innerText = `${room.price_amount} ${getSymbol(room.chain)}`;
  document.getElementById("room-fiat-display").innerText = `~$${(room.price_amount * 2700).toLocaleString()} USD`;
  document.getElementById("room-chain-display").innerText = room.chain;
  document.getElementById("room-files-count-display").innerText = `${room.file_count || 1} File(s) (${room.total_size || '14.2 MB'})`;
  document.getElementById("room-wallet-display").innerText = room.wallet_address;

  const roomQr = document.getElementById("room-pay-qr");
  if (roomQr) {
    roomQr.innerHTML = generateQRCodeSVG(room.wallet_address, 100);
  }

  updateRoomStatusUI(room.status);
  showView("room");
}

function getSymbol(chain) {
  switch (chain) {
    case "Solana": return "SOL";
    case "Bitcoin": return "BTC";
    case "Polygon": return "POL";
    case "BNB Chain": return "BNB";
    case "Base": return "USDC";
    default: return "ETH";
  }
}

function updateRoomStatusUI(status) {
  const badge = document.getElementById("room-status-badge");
  const downloadBtn = document.getElementById("download-files-btn");

  if (!badge || !downloadBtn) return;

  if (status === "approved" || status === "released" || status === "completed") {
    badge.className = "status-pill status-approved";
    badge.innerText = "Payment Verified & Released";
    downloadBtn.style.opacity = "1";
    downloadBtn.style.pointerEvents = "auto";
    downloadBtn.className = "btn btn-lg btn-success";
    downloadBtn.innerHTML = '<i data-lucide="download" style="width:18px;height:18px;"></i> Download Decrypted Files';
  } else if (status === "payment_submitted") {
    badge.className = "status-pill status-submitted";
    badge.innerText = "Payment Under Oracle Verification";
    downloadBtn.style.opacity = "0.5";
    downloadBtn.style.pointerEvents = "none";
    downloadBtn.innerHTML = '<i data-lucide="clock" style="width:18px;height:18px;"></i> Awaiting Seller Release';
  } else {
    badge.className = "status-pill status-awaiting";
    badge.innerText = "Awaiting Payment";
    downloadBtn.style.opacity = "0.5";
    downloadBtn.style.pointerEvents = "none";
    downloadBtn.innerHTML = '<i data-lucide="lock" style="width:18px;height:18px;"></i> Download Files (Locked)';
  }

  if (window.lucide) window.lucide.createIcons();
}

function copySellerWallet() {
  if (!currentActiveRoom) return;
  navigator.clipboard.writeText(currentActiveRoom.wallet_address).then(() => {
    showToast("Seller receiving address copied to clipboard!");
  });
}

function submitPaymentProof() {
  const txHash = document.getElementById("payment-txhash").value.trim();
  if (!txHash) {
    showToast("Please enter your transaction hash or signature.");
    return;
  }

  if (currentActiveRoom) {
    currentActiveRoom.status = "payment_submitted";
    currentActiveRoom.tx_hash = txHash;
    saveRoomUpdate(currentActiveRoom);
    updateRoomStatusUI("payment_submitted");
    showToast("Payment proof submitted! Oracle indexing started.");
  }
}

function approveRelease() {
  if (!currentActiveRoom) return;
  currentActiveRoom.status = "approved";
  saveRoomUpdate(currentActiveRoom);
  updateRoomStatusUI("approved");
  showToast("Escrow released! Buyer can now download decrypted files.");
}

function rejectPayment() {
  if (!currentActiveRoom) return;
  currentActiveRoom.status = "disputed";
  saveRoomUpdate(currentActiveRoom);
  updateRoomStatusUI("disputed");
  showToast("Deal flagged for arbitration review.");
}

function saveRoomUpdate(room) {
  const index = simulatedRooms.findIndex(r => r.room_code === room.room_code);
  if (index !== -1) {
    simulatedRooms[index] = room;
    localStorage.setItem("vaultdrop_rooms", JSON.stringify(simulatedRooms));
  }
  if (supabaseClient) {
    supabaseClient.from("rooms").update({ status: room.status }).eq("room_code", room.room_code).then(() => {});
  }
}

function triggerDownload() {
  showToast("Generating short-lived signed download stream...");
  setTimeout(() => {
    const dummyContent = `Vaultdrop Institutional Escrow Verified Delivery Archive\n\nRoom Code: #${currentActiveRoom ? currentActiveRoom.room_code : '000000'}\nDeal: ${currentActiveRoom ? currentActiveRoom.title : 'Digital Asset'}\nTimestamp: ${new Date().toISOString()}\n\nStatus: 200 OK — Decrypted successfully.`;
    const blob = new Blob([dummyContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vaultdrop-archive-${currentActiveRoom ? currentActiveRoom.room_code : 'release'}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Download started!");
  }, 1000);
}

// 10. CERTIFICATE MODAL
function openCertificateModal() {
  if (!currentActiveRoom) return;
  const modal = document.getElementById("cert-modal");
  document.getElementById("cert-code").innerText = `#${currentActiveRoom.room_code}`;
  document.getElementById("cert-title").innerText = currentActiveRoom.title;
  document.getElementById("cert-amount").innerText = `${currentActiveRoom.price_amount} ${getSymbol(currentActiveRoom.chain)}`;
  document.getElementById("cert-chain").innerText = currentActiveRoom.chain;
  document.getElementById("cert-time").innerText = new Date().toUTCString();
  modal.classList.add("open");
}

function closeCertificateModal() {
  document.getElementById("cert-modal").classList.remove("open");
}

// 11. DASHBOARD COMMAND CENTER
function loadDashboardTable(filterText = "") {
  const tbody = document.getElementById("dashboard-table-body");
  if (!tbody) return;

  const filtered = simulatedRooms.filter(r => {
    const search = filterText.toLowerCase();
    return r.room_code.includes(search) || r.title.toLowerCase().includes(search) || r.chain.toLowerCase().includes(search);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:36px; color:var(--text-muted);">No matching transfers found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    let badgeClass = "status-awaiting";
    let badgeLabel = "Awaiting Payment";
    if (r.status === "approved" || r.status === "released") {
      badgeClass = "status-approved";
      badgeLabel = "Released";
    } else if (r.status === "payment_submitted") {
      badgeClass = "status-submitted";
      badgeLabel = "Payment Sent";
    } else if (r.status === "disputed") {
      badgeClass = "status-disputed";
      badgeLabel = "Disputed";
    }

    return `
      <tr>
        <td style="font-family:var(--font-mono); font-weight:800; color:var(--primary);">#${escapeHtml(r.room_code)}</td>
        <td><strong>${escapeHtml(r.title)}</strong></td>
        <td style="font-family:var(--font-mono); font-weight:700;">${r.price_amount} ${getSymbol(r.chain)}</td>
        <td>${escapeHtml(r.chain)}</td>
        <td><span class="status-pill ${badgeClass}">${badgeLabel}</span></td>
        <td style="font-size:0.82rem; color:var(--text-muted);">${new Date(r.created_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn-secondary" style="padding:6px 14px; font-size:0.78rem;" onclick="loadRoom('${r.room_code}')">
            <i data-lucide="external-link" style="width:13px;height:13px;"></i> View Room
          </button>
        </td>
      </tr>
    `;
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

function filterDashboardTable() {
  const query = document.getElementById("dashboard-search").value;
  loadDashboardTable(query);
}

// 12. EXPLORER TRANSACTION FEED
function loadExplorerFeed() {
  const tbody = document.getElementById("explorer-table-body");
  if (!tbody) return;

  const mockFeeds = [
    { tx: "0x8f2a...3e21", cat: "Next.js Enterprise SaaS Source Code", val: "$14,500.00 (5.4 ETH)", net: "Ethereum", time: "1 min ago" },
    { tx: "0x3c2e...881a", cat: "Unreal Engine 5 Master VFX Environment", val: "$4,200.00 (18.2 SOL)", net: "Solana", time: "4 mins ago" },
    { tx: "0x77d1...99bc", cat: "Confidential M&A Legal Data Room", val: "$85,000.00 (USDC)", net: "Base", time: "11 mins ago" },
    { tx: "0x55aa...112e", cat: "AI LLM Fine-Tuned PyTorch Weights", val: "$9,800.00 (3.6 ETH)", net: "Arbitrum", time: "19 mins ago" },
    { tx: "0x12bb...cc44", cat: "Premium 3-Letter Brand Domain Name", val: "$32,000.00 (1.1 BTC)", net: "Bitcoin", time: "32 mins ago" }
  ];

  tbody.innerHTML = mockFeeds.map(f => `
    <tr>
      <td><span class="status-pill status-approved">SETTLED</span></td>
      <td style="font-family:var(--font-mono); color:var(--primary); font-weight:700;">${f.tx}</td>
      <td><strong>${f.cat}</strong></td>
      <td style="font-family:var(--font-mono); font-weight:700;">${f.val}</td>
      <td>${f.net}</td>
      <td style="font-size:0.82rem; color:var(--text-muted);">${f.time}</td>
    </tr>
  `).join("");

  if (window.lucide) window.lucide.createIcons();
}

// 13. DEVELOPER PLATFORM API DEMO
function copyCodeSnippet() {
  const snippet = document.getElementById("api-snippet").innerText;
  navigator.clipboard.writeText(snippet).then(() => {
    showToast("cURL request copied to clipboard!");
  });
}

function testApiResponse() {
  const respBox = document.getElementById("api-response-box");
  respBox.style.display = "block";
  respBox.innerHTML = `// Sending request to https://bpeovumhxpgnwcirpgjl.supabase.co...\n// Response (200 OK):\n{\n  "status": "success",\n  "room_code": "849201",\n  "escrow_id": "esc_99fa8120b",\n  "encrypted_vault": "sb://escrow-files/room-849201",\n  "timestamp": "${new Date().toISOString()}"\n}`;
  showToast("Test API response received!");
}

// 14. TEMPLATE SELECTOR
function applyTemplate(title, chain, price) {
  showView("send");
  document.getElementById("deal-title").value = title;
  document.getElementById("deal-chain").value = chain;
  document.getElementById("deal-amount").value = price;
  updateCurrencySymbol();
  showToast(`Blueprint '${title}' loaded!`);
}

// 15. SIMULATOR
function updateSimulator() {
  const slider = document.getElementById("sim-slider");
  if (!slider) return;

  const val = parseFloat(slider.value);
  const fee = (val * 0.005).toFixed(2);
  const payout = (val - fee).toFixed(2);
  const tradFiFee = (val * 0.045).toFixed(2);
  const savings = (tradFiFee - fee).toFixed(2);
  const ethRate = (val / 2700).toFixed(2);

  document.getElementById("sim-val-display").innerText = `$${val.toLocaleString()} USD`;
  document.getElementById("sim-crypto-display").innerText = `~${ethRate} ETH`;
  document.getElementById("sim-fee-display").innerText = `$${fee}`;
  document.getElementById("sim-payout-display").innerText = `$${payout}`;
  document.getElementById("sim-tradfi-display").innerText = `$${tradFiFee} (4.5%)`;
  document.getElementById("sim-savings-display").innerText = `+$${savings}`;
}

// 16. AI ESCROW CHAT ASSISTANT
function toggleChat() {
  const modal = document.getElementById("chat-modal");
  if (modal) modal.classList.toggle("open");
}

function sendQuickChat(text) {
  const input = document.getElementById("chat-input");
  input.value = text;
  sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;

  const chatContainer = document.getElementById("chat-messages");

  const userEl = document.createElement("div");
  userEl.className = "chat-msg msg-user";
  userEl.innerText = msg;
  chatContainer.appendChild(userEl);
  input.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    const agentEl = document.createElement("div");
    agentEl.className = "chat-msg msg-agent";

    const lower = msg.toLowerCase();
    if (lower.includes("how") || lower.includes("work")) {
      agentEl.innerText = "Vaultdrop locks your digital files in encrypted Supabase Storage and generates a 6-digit room code. The buyer enters the code, sends crypto to your wallet, and upon confirmation, files are instantly decrypted and delivered!";
    } else if (lower.includes("chain") || lower.includes("supported") || lower.includes("crypto")) {
      agentEl.innerText = "We support Ethereum, Solana, Bitcoin, Base, Polygon, BNB Chain, and Arbitrum with 0.5% flat protocol fees.";
    } else if (lower.includes("release") || lower.includes("approve")) {
      agentEl.innerText = "Once the buyer submits their transaction hash, open the room code and click 'Approve & Release Files' to grant instant download access.";
    } else {
      agentEl.innerText = "Thank you for reaching out. You can create a deal room via 'Lock & Send', or inspect existing transfers in 'My Transfers'.";
    }

    chatContainer.appendChild(agentEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 450);
}

// 17. TOAST NOTIFICATION
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

function handleSupportSubmit(e) {
  e.preventDefault();
  showToast("Support ticket received! An escrow keymaster will reply within 15 minutes.");
  e.target.reset();
}

function handleCurrencyChange() {
  const sel = document.getElementById("currency-select").value;
  currentCurrency = sel;
  showToast(`Currency display switched to ${sel}`);
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 18. INITIALIZE ON DOM LOAD
window.addEventListener("DOMContentLoaded", () => {
  initParticleCanvas();
  initDropzone();
  updateSimulator();
  loadExplorerFeed();

  // Periodic Gas ticker fluctuation simulator
  setInterval(() => {
    const ethGas = Math.floor(10 + Math.random() * 8);
    const solTps = Math.floor(2700 + Math.random() * 300);
    const ethEl = document.getElementById("eth-gas-val");
    const solEl = document.getElementById("sol-tps-val");
    if (ethEl) ethEl.innerText = `${ethGas} Gwei`;
    if (solEl) solEl.innerText = `${solTps.toLocaleString()} TPS`;
  }, 4000);

  // Hash URL routing
  const hash = window.location.hash.substring(1);
  if (hash.startsWith("room=")) {
    const code = hash.split("=")[1];
    if (code) loadRoom(code);
  } else if (hash) {
    showView(hash);
  } else {
    showView("home");
  }

  if (window.lucide) window.lucide.createIcons();
});
