document.addEventListener('DOMContentLoaded', () => {
    // Set today's date as default
    document.getElementById('date').valueAsDate = new Date();

    const form = document.getElementById('admin-form');
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('status-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const version = document.getElementById('version').value.trim();
        const date = document.getElementById('date').value;
        const changesRaw = document.getElementById('changes').value;
        const password = document.getElementById('password').value;

        // Parse changes by line, removing empty lines and optionally trim dashes
        const changes = changesRaw.split('\n')
            .map(line => line.trim().replace(/^- /g, '').trim())
            .filter(line => line.length > 0);

        if (changes.length === 0) {
            showMessage('Bitte mindestens eine Änderung angeben.', 'error');
            return;
        }

        const payload = {
            password: password,
            update: {
                version: version,
                date: date,
                changes: changes
            }
        };

        submitBtn.disabled = true;
        showMessage('Speichere...', '');

        try {
            const response = await fetch('/api/updates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage('Update erfolgreich hinzugefügt!', 'success');
                // Reset form slightly, keep password if wanted, but clear changes
                document.getElementById('version').value = '';
                document.getElementById('changes').value = '';
            } else {
                showMessage(result.message || 'Fehler beim Speichern.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Netzwerkfehler.', 'error');
        } finally {
            submitBtn.disabled = false;
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
    }
});
