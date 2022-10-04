const createGallery = function () {
    const _gallery = document.querySelector('.gallery-random');
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    function shuffle(nums) {
        for (let i = nums.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }
    shuffle(nums);

    for(let i = 0; i < 9; i++) {
        const img = new Image();
        img.src = `./src/images/${nums[i]}.jpg`;
        img.style.width = `${Math.trunc(window.innerWidth * 0.8)}px`;
        _gallery.appendChild(img);
    }
}

createGallery();