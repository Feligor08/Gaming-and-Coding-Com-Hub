document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('updates-container');

    try {
        const response = await fetch('/api/updates');
        if (!response.ok) throw new Error('Network response was not ok');
        const updates = await response.json();

        if (!updates || updates.length === 0) {
            container.innerHTML = '<div class="loader">Keine Updates gefunden.</div>';
            return;
        }

        container.innerHTML = ''; // Clear loader

        updates.forEach(update => {
            const card = document.createElement('div');
            card.className = 'update-card';

            const header = document.createElement('div');
            header.className = 'card-header';

            const versionBadge = document.createElement('span');
            versionBadge.className = 'version-badge';
            versionBadge.textContent = `v${update.version}`;

            const dateSpan = document.createElement('span');
            dateSpan.className = 'update-date';
            dateSpan.textContent = update.date;

            header.appendChild(versionBadge);
            header.appendChild(dateSpan);
            card.appendChild(header);

            const list = document.createElement('ul');
            list.className = 'changes-list';

            update.changes.forEach(change => {
                const li = document.createElement('li');
                li.textContent = change;
                list.appendChild(li);
            });

            card.appendChild(list);
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching updates:', error);
        container.innerHTML = '<div class="loader">Fehler beim Laden der Updates.</div>';
    }
});
