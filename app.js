 const video = document.getElementById("video");
const alerts = document.getElementById("alerts");
const summaryBox = document.getElementById("summary");
let demoInterval;

function startDemo() {
  alerts.textContent = "✅ Demo Started. Playing video...";
  summaryBox.style.display = "none";
  video.play();


  if (demoInterval) clearInterval(demoInterval);

  const timeline = [
    { time: 3, message: "⚠ good Eye Contact" },
    { time: 7, message: "✅ Good Posture" },
    { time: 12, message: "⚠ Slouching Detected" },
    { time: 18, message: "✅ Engaged" },
    { time: 25, message: "⚠ Looking Away" }
  ];

  demoInterval = setInterval(() => {
    let current = Math.floor(video.currentTime);
    timeline.forEach(event => {
      if (current === event.time) {
        alerts.textContent = event.message;
      }
    });
  }, 1000);
}

function endDemo() {
  video.pause();
  clearInterval(demoInterval);
  alerts.textContent = "✅ Demo Ended.";

  
  document.getElementById("eyeScore").textContent = "68";
  document.getElementById("postureScore").textContent = "80";
  document.getElementById("engagement").textContent = "Medium";
  document.getElementById("suggestions").textContent =
    "Maintain longer eye contact, avoid slouching, keep head straight.";

  summaryBox.style.display = "block";
}

function downloadReport() {
  const text = `
AI Body Language Feedback Report
--------------------------------
Eye Contact: ${document.getElementById("eyeScore").textContent}%
Posture Score: ${document.getElementById("postureScore").textContent}/100
Engagement Level: ${document.getElementById("engagement").textContent}
Suggestions: ${document.getElementById("suggestions").textContent}
  `;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "session_report.txt";
  link.click();

}
