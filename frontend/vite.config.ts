// // import react from '@vitejs/plugin-react'
// // import { defineConfig } from 'vite'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import oxlint from 'vite-plugin-oxlint'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/elephant-learning/',
  plugins: [
    react(),
    tailwindcss(),
    oxlint(),
  ],
})