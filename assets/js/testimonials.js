// let dummyTestimonials = [
//     {
//         author: "Amir Mahmud",
//         rating: 5,
//         caption: "Keren Banget!",
//         image: "my-img.jpg"
//     },
//     {
//         author: "Alex Josua",
//         rating: 5,
//         caption: "Mantapp! Terima Kasih!",
//         image: "coding.jpg"
//     },
//     {
//         author: "Christina Adelia",
//         rating: 4,
//         caption: "Sudah Bagus! Suka Banget",
//         image: "my-img.jpg"
//     },
//     {
//         author: "Leo G",
//         rating: 2,
//         caption: "Sudah Bagus tapi harus diperbaiki lagi",
//         image: "coding.jpg"
//     },
//     {
//         author: "Amel Effendi",
//         rating: 4,
//         caption: "Asik Banget!",
//         image: "blog-img.png"
//     },
// ];

function fetchTestimonials() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", "https://api.npoint.io/37b03059009dda95802a", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                // console.log("Response :", JSON.parse(response));
                resolve (response.testimonials);

            } else {
                // console.error("Error :", xhr.status);
                reject ("Error :",xhr.status);
            }
        };

        xhr.onerror = () => reject("network error")

        xhr.send();
    })
}

const testimonialsContainer = document.getElementById("testimonialsContainer")

const testimonialsHTML = (array) => {
    return array.map (
        (testimonial) => `
        <article>
          <img src="${testimonial.image}" alt="testimonial-img" />
          <p class="testimonial-item-caption">"${testimonial.caption}"</p>
          <p style="text-align: right">- ${testimonial.author}</p>
          <p style="text-align: right; font-weight: bold">${testimonial.rating}★</p>
        </article>
        `
    ).join("")
}

async function showAllTestimonials() {
    const testimonials = await fetchTestimonials();
    console.log(testimonials);
    testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonials()

async function filterTestimonialsByStar(rating) {
    const testimonials = await fetchTestimonials()

    const filteredTestimonials = testimonials.filter(
        (testimonial) => testimonial.rating === rating
    )

    console.log(filteredTestimonials);

    if(filteredTestimonials.length === 0) {
        return (testimonialsContainer.innerHTML =`<p>No Testimonials.</p>`);
    }

    testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonials)
}