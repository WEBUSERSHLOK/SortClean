# SortClean - Waste Classification App

## Purpose

SortClean addresses the everyday challenge of proper waste sorting and recycling. Using artificial intelligence and image recognition, the app helps users:

- **Reduce Environmental Impact**: By ensuring items are correctly sorted between recycling and waste
- **Prevent Contamination**: Avoid putting non-recyclable items in recycling bins, which can contaminate entire batches
- **Educate Users**: Learn proper waste sorting through immediate feedback and classification
- **Track Progress**: Monitor sorting habits and improve waste management practices

The app serves as a practical tool for individuals, households, and organizations committed to responsible waste management and environmental sustainability.

## Overview

A mobile-friendly application that helps users classify items as recyclable, trash, or neither using AI-powered image recognition.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the application:
```bash
ionic serve
```

## How to Use

### Taking Photos and Classification

1. Open the app and click on the "Camera" tab
2. Click the "Take Photo" button to capture an item
3. The app will:
   - Show the captured image
   - Display classification results with confidence scores
   - Automatically save the result

### Viewing Results

1. Go to the "Results" tab to see all classified items
2. The results page shows:
   - Total items scanned
   - Number of recyclable items
   - Number of trash items
   - Number of items that are neither
   - Individual item cards with classifications

### Understanding Classifications

- **Recyclable**: Items that can be recycled (marked in green)
- **Trash**: Items that should go to general waste (marked in red)
- **Neither**: Items that need special disposal or don't fit the other categories (marked in blue)

### Removing Items

To remove an item from your history:
1. Go to the "Results" tab
2. Find the item you want to remove
3. Click the "Remove" button on its card

## Tips for Best Results

1. Ensure good lighting when taking photos
2. Center the item in the frame
3. Take photos against a plain background
4. Hold the camera steady to avoid blur

## Additional Features

- Debug panel shows top 3 predictions with confidence scores
- Color-coded results for easy identification
- Statistics dashboard for tracking sorting habits