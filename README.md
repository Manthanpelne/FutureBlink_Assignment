# 🚀 AI-Flow-Builder

A specialized MERN stack application that allows users to architect AI prompts using a node-based visual interface. Built with **React Flow**, **Tailwind CSS**, and **OpenRouter AI**.


## 🌐 Links
- **GitHub Repository:** [Manthanpelne/FutureBlink_Assignment](https://github.com/Manthanpelne/FutureBlink_Assignment)
- **Backend Deployment:** [Render Link](https://futureblink-assignment-w81o.onrender.com)
- **Live Deployment:** [Netlify Link](https://dulcet-lamington-9f866d.netlify.app/)

## ✨ Features
- **Visual Flow Interface:** Use `React Flow` to manage AI prompts through draggable nodes.
- **AI Integration:** Powered by **OpenRouter** using the `google/gemini-2.0-flash-001` model for high-speed, intelligent responses.
- **Real-time State Sync:** Custom nodes that stay in sync with React state using `useCallback` and `useEffect`.
- **MERN Persistence:** Save your best AI interactions directly to **MongoDB**.
- **Responsive Design:** Fully styled with **Tailwind CSS** for a modern, dark-mode inspired aesthetic.

## 🛠️ Tech Stack
- **Frontend:** React.js, React Flow, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **AI API:** OpenRouter (Gemini 2.0 Flash)

## ⚠️ Important Note on AI Models
During development, the following free-tier models were tested:
- `google/gemini-2.0-flash-lite-preview-02-05:free` (Inactive/Endpoint Issues)
- `mistralai/mistral-7b-instruct:free` (Deprecated Endpoint)

**Current Implementation:** The project successfully utilizes **`google/gemini-2.0-flash-001`** for reliable and fast response generation.

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Manthanpelne/FutureBlink_Assignment.git](https://github.com/Manthanpelne/FutureBlink_Assignment.git)
cd frontend
npm run dev
