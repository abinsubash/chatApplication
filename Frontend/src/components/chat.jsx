// import React from "react";

function Chat() {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Chat Application</h1>
            <div style={styles.chatBox}>
                {/* Dummy messages */}
                <div style={styles.message}><b>User 1:</b> Hello!</div>
                <div style={styles.message}><b>User 2:</b> Hi, how are you?</div>
            </div>
            <div style={styles.inputSection}>
                <input 
                    type="text" 
                    placeholder="Type your message..." 
                    style={styles.input}
                />
                <button style={styles.button}>Send</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
    },
    header: {
        textAlign: "center",
        marginBottom: "20px",
        fontSize: "24px",
        color: "#333",
    },
    chatBox: {
        maxHeight: "300px",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid #ddd",
        marginBottom: "10px",
        borderRadius: "5px",
        backgroundColor: "#fff",
    },
    message: {
        marginBottom: "10px",
        fontSize: "16px",
        lineHeight: "1.5",
    },
    inputSection: {
        display: "flex",
        gap: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "1px solid #ddd",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Chat;
