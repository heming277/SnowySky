import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

document.addEventListener('DOMContentLoaded', function() {
  var client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('post');

  if (postId) {
    client.getEntry(postId)
      .then(async function(entry) {
        // Set the title with enhanced Tailwind CSS styling
        document.getElementById('blog-post-title').innerHTML = `<h1 class="text-4xl lg:text-5xl font-bold text-center my-8 text-gray-800">${entry.fields.title}</h1>`;

        // Render the body content within a styled div
        let renderedHtml = documentToHtmlString(entry.fields.body);
        // Modify hyperlinks to open in a new window and have a different color
        renderedHtml = renderedHtml.replace(/<a href="/g, '<a href="').replace(/<a /g, '<a target="_blank" class="text-blue-500 hover:text-blue-700" ');

        document.getElementById('blog-post-content').innerHTML = `<div class="prose lg:prose-xl mx-auto px-8 sm:px-6 lg:px-6">${renderedHtml}</div>`;

        // Add a "Go Back" button at the bottom of the post
        const goBackButton = `<div class="text-center mt-8 mb-12">
        <a href="/#portfolio" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 lg:py-4 lg:px-8 lg:text-lg rounded transition-all duration-300 ease-in-out dark:bg-white dark:hover:bg-gray-500">Back to Home</a>
        </div>`;
        document.getElementById('blog-post-content').innerHTML += goBackButton;

        // Handle the image with enhanced Tailwind CSS styling
        if (entry.fields.image) {
          const imageId = entry.fields.image.sys.id;
          const image = await client.getAsset(imageId);
          const imageUrl = image.fields.file.url;
          // Insert the image at the beginning of the blog post content with enhanced Tailwind CSS classes
          const imageHtml = `<img src="${imageUrl}" class="rounded-lg shadow-lg mx-auto my-8" alt="Blog Image" style="max-height: 60vh; width: auto;">`;
          document.getElementById('blog-post-content').innerHTML = imageHtml + document.getElementById('blog-post-content').innerHTML;
        }
      })
      .catch(console.error);
  } else {
    document.getElementById('blog-post-content').innerHTML = '<p class="text-center my-4 text-gray-600">Post not found.</p>';
  }
});