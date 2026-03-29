# Reactivity Playground

An interactive playground to understand how reactivity works under the hood.

Instead of jumping straight into frameworks, this project breaks down three core approaches to updating UI based on state changes:

- Manual updates  
- Object.defineProperty  
- Proxy  

---

## 🌐 Live Demo

👉 https://jithinaji.github.io/reactivity-playground/

---

## 🧠 What this teaches

This project is built to help you understand:

- How state and UI stay in sync  
- Why frameworks like Vue and React behave the way they do  
- The evolution of reactivity techniques in JavaScript  

---

## ⚙️ Approaches Compared

### 1. Manual Reactivity
You update the UI yourself after every state change.

input → state → render() → DOM

- Simple  
- Explicit  
- Easy to understand  
- Not scalable  

---

### 2. Object.defineProperty
Intercepts state changes using getters and setters.

input → state → setter → render() → DOM

- Automatically updates UI  
- Limited to predefined properties  
- Used in older frameworks (like Vue 2)  

---

### 3. Proxy-based Reactivity
Uses a Proxy to track and react to any property change dynamically.

input → proxy → set trap → renderEffect → DOM

- Dynamic  
- Scalable  
- Supports new properties  
- Modern approach (Vue 3, etc.)  

---

## 🧪 Features

- Live input shared across all approaches  
- Side-by-side comparison of outputs  
- Dynamic property creation  
- Code viewer with explanations  
- Minimal UI to focus on learning  

---

## 🏗️ Project Structure

/manualBinding.js         → Manual reactivity logic  
/objectDefineBinding.js  → Object.defineProperty implementation  
/proxyBinding.js         → Proxy-based implementation  
/codeMap.js              → Code + explanation mapping  
/main.js                 → App logic and bindings  
/index.html              → UI layout  

---

## 🚀 How to Run

Just open the HTML file:

index.html

Or use a local server:

npx serve

---

## 🎯 Why this project exists

Most tutorials teach how to use frameworks.

This project focuses on understanding how they actually work internally.

---

## 📌 Future Improvements

- Better visualization of updates  
- Highlight which system triggers updates  
- Performance comparison  
- More complex state examples  

---

## 👨‍💻 Author

Jithin Aji

---

## ⭐ If you found this useful

Give it a star or share it with someone who thinks React is magic.
