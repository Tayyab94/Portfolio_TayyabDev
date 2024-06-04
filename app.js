(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })


    const resumeBtn = document.getElementsByClassName('resumedBtn');

    if (resumeBtn) {
        resumeBtn.addEventListener('click', function () {
            // Your event handler code
            resumeBtn.addEventListener('click', function () {

                var resumePath = 'static/Tayyab_Resume.docx';

                // Create a link element
                var link = document.createElement('a');
                link.href = resumePath;

                // Set the download attribute with the desired filename
                link.download = 'resume.docx';

                // Append the link to the document
                document.body.appendChild(link);

                // Trigger a click event on the link
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            })
        });
    } else {
        alert("Err")
        console.error('resumeBtn not found');
    }

})();
