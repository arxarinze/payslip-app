# PaySlips App

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
- [Deploying on iOS and Android](#deploying-on-ios-and-android)
  - [Prerequisites](#prerequisites-1)
  - [Build and Deploy](#build-and-deploy)
- [Contributing](#contributing)
- [License](#license)

## Overview

A comprehensive and modern application for managing and viewing payslips. This project provides an intuitive interface for users to access, view, and download their payslips with ease.

## Features

- **User-Friendly Interface:** Elegant payslip cards with animated transitions for a delightful user experience.

- **Payslip Details:** Displays key details such as the payslip ID, period, and an option to download the payslip file.

- **Responsive Design:** Ensures a consistent and visually appealing layout across various devices.

- **Animated Transitions:** Utilizes React Spring to implement smooth and eye-catching animations.

- **Cross-Platform Compatibility:** Supports web, iOS, and Android platforms using Capacitor.

## Installation

```bash
npm install
```

## Usage

- To build and sync:

```bash
npm run build && npx cap sync
```

- for ios:
```bash
npx cap run ios
```

- for android:
``` bash
npx cap run android
```

## Development
### Prerequisites
- Before getting started with development, make sure you have the following installed:

- Node.js 18+
- npm
- Capacitor CLI

### Getting Started
- Clone the repository:
```bash
git clone https://github.com/your-username/payslips-app.git
```

- Change into the project directory:
```bash
cd payslips-app
```

- Install dependencies:
```bash
npm install
```

## Deploying on iOS and Android for native IDES
### Prerequisites
- Before deploying to iOS and Android, ensure you have the following:

- - Xcode (for iOS)
- - Android Studio (for Android)

### Build and Deploy
- Open native projects:

- - for android:
```bash
npx cap open android
```
- - for ios:
```bash
npx cap open ios
```
*Build and run using the native IDEs*
