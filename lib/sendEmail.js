export const sendEmail = async(data) => {
    try {
        const res = await fetch('/api/sendemail', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (result.success) {
            console.log("Email sent successfully");
        } else {
            console.log("Failed to send email");
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}