import React from 'react'

interface SearchHighlightProps {
  text: string
  searchQuery: string
}

const SearchHighlight: React.FC<SearchHighlightProps> = ({ text, searchQuery }) => {
  if (!searchQuery || !text) return <>{text}</>

  try {
    const regex = new RegExp(`(${searchQuery})`, 'gi')
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, i) => (
          part.toLowerCase() === searchQuery?.toLowerCase() ? (
            <mark key={i} className="bg-yellow-100 rounded px-1">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        ))}
      </>
    )
  } catch (error) {
    // In case of invalid regex
    return <>{text}</>
  }
}

export default SearchHighlight