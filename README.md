# 🔐 Cipher Visualization Tool

**A Comprehensive Interactive Cryptography Learning Platform**

This project is part of my **7th Semester Cryptography Course Laboratory Work**, designed to provide hands-on experience with classical encryption techniques through modern web technologies. The application serves as both an educational tool and a practical implementation of fundamental cryptographic algorithms.

## 📚 **Academic Context**

**Course:** Cryptography (7th Semester)  
**Type:** Laboratory Assignment  
**Objective:** Understanding and implementing classical cipher algorithms with interactive visualizations  
**Institution:** University of Karachi 
**Academic Year:** 4th

This lab project demonstrates the practical application of theoretical cryptographic concepts learned in class, bridging the gap between mathematical foundations and real-world implementations.

## 🎯 **Project Description**

The Cipher Visualization Tool is an advanced web application that brings classical cryptography to life through interactive demonstrations. Built with cutting-edge web technologies, it provides real-time encryption and decryption capabilities for six fundamental cipher algorithms, each accompanied by detailed step-by-step visualizations.

### **🔍 What Makes This Special**

Unlike traditional cryptography tools that simply show input and output, this application provides:

- **Educational Transparency** - Every step of the encryption/decryption process is visualized
- **Interactive Learning** - Real-time processing as you type
- **Mathematical Insights** - Clear display of underlying mathematical operations
- **Visual Representations** - Matrices, grids, and patterns for better understanding
- **Dual Functionality** - Both encryption and decryption modes for complete learning

### **🎓 Learning Outcomes**

Through this project, students will:
- Understand the mechanics of classical cipher algorithms
- Visualize how different encryption techniques transform plaintext
- Compare strengths and weaknesses of various cipher methods
- Gain practical experience with cryptographic implementations
- Develop appreciation for modern encryption complexity

![Cipher Tool Preview](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Academic Project](https://img.shields.io/badge/Academic-Lab%20Project-green?style=for-the-badge)

## ✨ Features

### 🔤 **Implemented Cipher Algorithms**

#### **1. Caesar Cipher (Shift Cipher)**
- **Type:** Monoalphabetic Substitution
- **Complexity:** Basic
- **Key Space:** 25 possible keys
- **Educational Value:** Introduction to substitution ciphers
- **Implementation:** Variable shift with real-time adjustment

#### **2. Vigenère Cipher**
- **Type:** Polyalphabetic Substitution
- **Complexity:** Intermediate
- **Key Space:** Variable length keywords
- **Educational Value:** Understanding polyalphabetic systems
- **Implementation:** Keyword-based encryption with key repetition

#### **3. Rail Fence Cipher**
- **Type:** Transposition
- **Complexity:** Basic to Intermediate
- **Key Space:** Number of rails (2-8)
- **Educational Value:** Introduction to transposition ciphers
- **Implementation:** Zigzag pattern visualization

#### **4. Columnar Transposition Cipher**
- **Type:** Transposition
- **Complexity:** Intermediate
- **Key Space:** Keyword permutations
- **Educational Value:** Advanced transposition techniques
- **Implementation:** Matrix-based column reordering

#### **5. Hill Cipher**
- **Type:** Polygraphic Substitution
- **Complexity:** Advanced
- **Key Space:** Invertible matrices mod 26
- **Educational Value:** Mathematical cryptography introduction
- **Implementation:** 2×2 and 3×3 matrix operations

#### **6. Playfair Cipher**
- **Type:** Digraph Substitution
- **Complexity:** Intermediate to Advanced
- **Key Space:** 5×5 matrix arrangements
- **Educational Value:** Block cipher concepts
- **Implementation:** 5×5 grid with digraph rules

### 🎯 **Core Functionality**
- **Real-time Processing** - Encrypt/decrypt as you type
- **Dual Mode Operation** - Switch between encryption and decryption
- **Step-by-step Visualization** - Detailed process breakdown with emojis
- **Interactive Matrices** - Visual representation of cipher grids and patterns
- **Copy & Download** - Easy sharing and saving of results
- **Responsive Design** - Works seamlessly on all devices

### 🎨 **User Experience**
- **Modern UI** - Beautiful gradients and animations
- **Dark Theme** - Easy on the eyes with professional styling
- **Error Handling** - User-friendly validation and feedback
- **Accessibility** - Screen reader friendly with proper ARIA labels

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/cipher-visualization-tool.git
   cd cipher-visualization-tool
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Cipher Implementation Guide

### 🔤 Caesar Cipher
**Algorithm:** `C = (P + K) mod 26`

**How it works:** Shifts each letter by a fixed number of positions in the alphabet.

**Example:**
- Plain text: `HELLO`
- Shift: `3`
- Process: H(7)→K(10), E(4)→H(7), L(11)→O(14), L(11)→O(14), O(14)→R(17)
- Cipher text: `KHOOR`

**Lab Learning Points:**
- Understanding modular arithmetic in cryptography
- Frequency analysis vulnerability
- Brute force attack feasibility

### 🔑 Vigenère Cipher
**Algorithm:** `C = (P + K) mod 26` (where K varies)

**How it works:** Uses a keyword to determine different shift values for each letter.

**Example:**
- Plain text: `HELLO`
- Key: `KEY` (K=10, E=4, Y=24)
- Process: H+K=R, E+E=I, L+Y=J, L+K=V, O+E=S
- Cipher text: `RIJVS`

**Lab Learning Points:**
- Polyalphabetic substitution advantages
- Key length impact on security
- Kasiski examination method

### 🚂 Rail Fence Cipher
**Algorithm:** Zigzag pattern arrangement

**How it works:** Writes text in a zigzag pattern across multiple rails, then reads off each rail.

**Example:**
- Plain text: `HELLO WORLD`
- Rails: `3`
- Pattern:
  \`\`\`
  H   O   R
   E L   W O L
    L   O   D
  \`\`\`
- Cipher text: `HORELWOLLOD`

**Lab Learning Points:**
- Transposition vs substitution
- Pattern recognition in ciphers
- Geometric approach to cryptography

### 📊 Columnar Cipher
**Algorithm:** Matrix arrangement with column reordering

**How it works:** Arranges text in columns based on keyword, then reads columns in alphabetical order.

**Example:**
- Plain text: `HELLO WORLD`
- Key: `ZEBRA` (order: 5,2,1,4,3)
- Matrix arrangement with column ordering
- Cipher text based on alphabetical key order

**Lab Learning Points:**
- Permutation-based encryption
- Key-dependent column ordering
- Matrix operations in cryptography

### 🔢 Hill Cipher
**Algorithm:** `C = PK mod 26` (matrix multiplication)

**How it works:** Uses matrix multiplication to encrypt blocks of letters.

**Example:**
- Plain text: `HELLO`
- Key matrix: `[[2,3],[1,4]]`
- Block processing: [H,E] × Matrix = [K,F]
- Mathematical operations with modulo 26

**Lab Learning Points:**
- Linear algebra in cryptography
- Matrix invertibility requirements
- Block cipher concepts
- Modular arithmetic applications

### ⬜ Playfair Cipher
**Algorithm:** 5×5 grid with digraph rules

**How it works:** Uses a 5×5 grid constructed from a keyword to encrypt letter pairs.

**Example:**
- Plain text: `HELLO`
- Key: `KEYWORD`
- 5×5 matrix generation
- Digraph rules: same row (right), same column (down), rectangle (swap)

**Lab Learning Points:**
- Digraph frequency analysis resistance
- Grid-based substitution
- Rule-based encryption systems
- Historical cipher evolution

## 🛠️ Technical Architecture

### **Frontend Stack**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

### **Project Structure**
\`\`\`
cipher-visualization/
├── app/
│   ├── globals.css          # Global styles and custom scrollbar
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── cipher-tool.tsx      # Main cipher interface
│   ├── cipher-result.tsx    # Results display component
│   └── ciphers/             # Individual cipher components
│       ├── caesar-cipher.tsx
│       ├── vigenere-cipher.tsx
│       ├── rail-fence-cipher.tsx
│       ├── columnar-cipher.tsx
│       ├── hill-cipher.tsx
│       └── playfair-cipher.tsx
├── lib/
│   └── utils.ts             # Utility functions
└── hooks/                   # Custom React hooks
\`\`\`

### **Algorithm Implementation Highlights**

#### **Mathematical Accuracy**
- Proper modular arithmetic implementation
- Matrix operations with determinant checking
- Inverse matrix calculation for Hill cipher
- Correct handling of edge cases

#### **Educational Features**
- Step-by-step process visualization
- Mathematical operation display
- Pattern recognition aids
- Error handling with educational feedback

## 🎨 Styling & Design

### **Design System**
- **Color Palette:** Slate grays with teal and purple accents
- **Typography:** System fonts with monospace for cipher text
- **Spacing:** Consistent 8px grid system
- **Animations:** Smooth transitions and hover effects

### **Responsive Breakpoints**
- **Mobile:** < 768px - Stacked layout
- **Tablet:** 768px - 1024px - Adaptive grid
- **Desktop:** > 1024px - Full side-by-side layout

### **Accessibility Features**
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## 🔧 Development

### **Available Scripts**
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
\`\`\`

### **Code Quality**
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality gates

### **Performance Optimizations**
- **Client-side rendering** - Prevents hydration mismatches
- **Lazy loading** - Components loaded on demand
- **Memoization** - Optimized re-renders
- **Bundle splitting** - Efficient code delivery

## 📚 Educational Value & Lab Objectives

### **Primary Learning Objectives**
1. **Algorithm Understanding** - Implement and visualize classical ciphers
2. **Mathematical Foundation** - Apply modular arithmetic and matrix operations
3. **Security Analysis** - Understand cipher strengths and vulnerabilities
4. **Practical Implementation** - Bridge theory with working code
5. **User Experience** - Create educational tools for complex concepts

### **Assessment Criteria**
- **Correctness** - Accurate algorithm implementation
- **Completeness** - All required ciphers implemented
- **User Interface** - Intuitive and educational design
- **Documentation** - Clear explanation of concepts
- **Code Quality** - Clean, maintainable, and well-commented code

### **Extended Learning Opportunities**
- Compare classical vs modern encryption
- Analyze computational complexity
- Explore frequency analysis techniques
- Understand historical cryptographic evolution
- Investigate cipher breaking methods

### **Use Cases**
- **Students** - Learning cryptography concepts interactively
- **Educators** - Teaching encryption principles with visual aids
- **Researchers** - Demonstrating classical cipher vulnerabilities
- **Security Enthusiasts** - Exploring historical encryption methods

## 🏆 Project Achievements

### **Technical Accomplishments**
- ✅ Six complete cipher implementations
- ✅ Real-time encryption/decryption
- ✅ Mathematical accuracy verification
- ✅ Responsive design across devices
- ✅ Accessibility compliance
- ✅ Type-safe development with TypeScript

### **Educational Impact**
- ✅ Step-by-step process visualization
- ✅ Interactive learning experience
- ✅ Mathematical operation transparency
- ✅ Pattern recognition aids
- ✅ Comprehensive documentation

### **Innovation Elements**
- ✅ Modern web technologies for classical algorithms
- ✅ Real-time processing capabilities
- ✅ Visual matrix and pattern representations
- ✅ Dual-mode operation (encrypt/decrypt)
- ✅ Educational feedback and error handling

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

### **Contribution Guidelines**
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance
- Maintain educational value

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**🎓 Built as part of 7th Semester Cryptography Course Laboratory Work**

*This project demonstrates the practical application of classical cryptographic algorithms through modern web development techniques, serving as both an educational tool and a comprehensive implementation showcase.*

**⚠️ Educational Notice:** These are classical ciphers implemented for educational purposes. For real-world security applications, use modern encryption standards like AES, RSA, or elliptic curve cryptography.
