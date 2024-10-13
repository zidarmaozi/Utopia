  // Navbar
    const navbar = document.querySelector(".navMenu");
    document.querySelector("#menu").onclick = () => {
      navbar.classList.toggle("active");
    };
    //nav scroling
    const navBar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
      const positionWindow = window.scrollY;
      navBar.classList.toggle("scrolling-active", positionWindow > 100);
    });

    window.onload = function () {
      const slider = document.getElementById("slide");
      const prev = document.getElementById("prev");
      const next = document.getElementById("next");
      const indicatorsContainer = document.getElementById("indicators");

      let currentIndex = 0;
      const totalSlides = slider.children.length;
      let autoScrollInterval; // Variabel untuk interval auto scroll

      // Membuat indikator
      for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");
        indicator.addEventListener("click", () => {
          currentIndex = i; // Set indeks ke slide yang dipilih
          updateSliderPosition();
          updateIndicators();
          resetAutoScroll(); // Reset auto scroll saat indikator diklik
        });
        indicatorsContainer.appendChild(indicator);
      }

      function updateSliderPosition() {
        const slideWidth = slider.children[0].clientWidth;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateIndicators(); // Update indikator saat posisi slider diperbarui
      }

      function updateIndicators() {
        const indicators = document.querySelectorAll(".indicator");
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle("active", index === currentIndex);
        });
      }

      function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % totalSlides; // Pindah ke slide selanjutnya
          updateSliderPosition();
        }, 3000); // Ubah slide setiap 3 detik (3000 ms)
      }

      function resetAutoScroll() {
        clearInterval(autoScrollInterval); // Hentikan auto scroll yang ada
        startAutoScroll(); // Mulai auto scroll baru
      }

      next.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalSlides; // Pindah ke slide selanjutnya
        updateSliderPosition();
        resetAutoScroll(); // Reset auto scroll saat tombol next diklik
      });

      prev.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Pindah ke slide sebelumnya
        updateSliderPosition();
        resetAutoScroll(); // Reset auto scroll saat tombol prev diklik
      });

      window.addEventListener("resize", updateSliderPosition);

      // Mulai auto scroll saat halaman dimuat
      startAutoScroll();
    };
