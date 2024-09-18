const classList = document.documentElement.classList

const APPEARANCE_KEY = 'appearance'

function updateAppearance() {
  const userPreference = localStorage.getItem(APPEARANCE_KEY)
  setClassList(userPreference === 'dark')
}

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  updateAppearance()
  window.addEventListener('storage', updateAppearance)
}

function setClassList(isDark = false) {
  if (isDark) {
    classList.add('dark')
  }
  else {
    classList.remove('dark')
  }
}

export function toggle() {
  if (classList.contains('dark')) {
    setClassList(false)
    localStorage.setItem(APPEARANCE_KEY, 'light')
  }
  else {
    setClassList(true)
    localStorage.setItem(APPEARANCE_KEY, 'dark')
  }
}
