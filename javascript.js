/* Load CSV to HTML */
Papa.parse("../identifikasi.csv", {
    download: true,
    header: true,
    complete: function(results) {
        // Set Map Default to Indonesia
        var map = L.map('map').setView([-2.5, 117], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        results.data.forEach(function(row) {
            if (row.Koordinat) {
                // Read Latitude and Langitude from Koordinat
                var coords = row.Koordinat.split(',');
                var lat = parseFloat(coords[0]);
                var lng = parseFloat(coords[1]);

                // Make Marker Function
                var marker = L.marker([lat, lng]).addTo(map);
                marker.on('click', function() {
                    console.log('Marker clicked');
                    var table = document.getElementById('table');
                    table.innerHTML = ''; // Clear previous table content

                    // Create Header Row for Table
                    table.classList.add('table', 'table-stripped', 'custom-table')
                    var headerRow = document.createElement('tr');
                    var columns = ['Kategori IPA', 'Kategori Budaya', 'Kab/Kota', 'Provinsi'];

                    columns.forEach(function(column) {
                        var th = document.createElement('th');
                        th.textContent = column;
                        headerRow.appendChild(th);
                    });

                    table.appendChild(headerRow);

                    // Create Data Row for Table
                    var tr = document.createElement('tr');
                    columns.forEach(function(column) {
                        var td = document.createElement('td');
                        td.textContent = row[column];
                        tr.appendChild(td);
                    });

                    table.appendChild(tr);

                    // Update Galery with Image and Caption
                    var galleryHeader = document.querySelector(".galery .header h2");
                    var galleryParagraph1 = document.querySelector(".galery .header p1");
                    var galleryParagraph2 = document.querySelector(".galery .header p2");
                    var galleryImage = document.querySelector(".galery img");

                    // Set the text content and image source
                    galleryHeader.textContent = row["Nama Budaya"];
                    galleryParagraph1.textContent = row["Warisan Budaya"];
                    galleryParagraph2.textContent = row["Konsep IPA"];
                    galleryImage.src = row["Gambar"];
                    galleryImage.alt = "images";
                });
            }
        });
    }
});
