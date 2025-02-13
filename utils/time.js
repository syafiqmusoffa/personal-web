function formatDateToWIB(date) {
    // let date = new Date();
    // 01 Feb 2025 11:22 WIB
    let monthList = [
        "Jan", // bukan 1, tapi 0 ==> bukan nama bulan, bukan angka bulannya, tapi index
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt", // bukan 10 tapi 9, karena yang diambil indexnya
        "Nov",
        "Des",
    ];

    let day = date.getDate().toString().padStart(2, "0");
    let month = monthList[date.getMonth()];
    let year = date.getFullYear();

    let hours = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");

    let formattedDate = `${day} ${month} ${year} ${hours}:${minutes} WIB`;

    return formattedDate;
}

function getRelativeTime(postTime) {
    let now = new Date();
    console.log("WAKTU SEKARANG :", now);

    console.log("WAKTU USER POST :", postTime);

    let diffTime = now - postTime;
    console.log("selisih waktu :", diffTime);

    let diffInSeconds = Math.floor((now - postTime) / 1000);
    console.log("selisih detik", diffInSeconds);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
    }

    let diffInMinutes = Math.floor(diffInSeconds / 60);

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
    }

    let diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    }

    let diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
    }

    let diffInMonth = Math.floor(diffInDays / 30);
    return `${diffInMonth} month${diffInMonth === 1 ? "" : "s"} ago`;
}

module.exports = { formatDateToWIB, getRelativeTime }