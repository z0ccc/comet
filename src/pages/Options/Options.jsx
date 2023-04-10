/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx, Box, Label, Flex, Link, Select, Checkbox } from 'theme-ui'

const Options = () => {
  const [hidePosts, setHidePosts] = useState(false)
  const [noPopupCheck, setNoPopupCheck] = useState(false)
  const [commentSort, setCommentSort] = useState('best')

  useEffect(() => {
    chrome.storage.local.get(
      ['hidePosts', 'noPopupCheck', 'commentSort'],
      (storage) => {
        storage.hidePosts !== undefined && setHidePosts(storage.hidePosts)
        storage.noPopupCheck !== undefined &&
          setNoPopupCheck(storage.noPopupCheck)
        storage.commentSort !== undefined && setCommentSort(storage.commentSort)
      }
    )
  }, [])

  return (
    <Box sx={{ mx: '20px' }}>
      <Box sx={{ mb: '12px' }}>
        <Label>
          <Checkbox />
          Dark mode
        </Label>
        <Label>
          <Checkbox
            checked={hidePosts}
            onChange={(e) => {
              setHidePosts(e.target.checked)
              chrome.storage.local.set({ hidePosts: e.target.checked })
            }}
          />
          Hide posts with 0 comments
        </Label>
        <Label>
          <Checkbox />
          Show YouTube comments by default
        </Label>
        <Label>
          <Checkbox
            checked={noPopupCheck}
            onChange={(e) => {
              setNoPopupCheck(e.target.checked)
              chrome.storage.local.set({ noPopupCheck: e.target.checked })
              chrome.action.setIcon({
                path: {
                  48: '../icon48.png',
                },
              })
            }}
          />
          Only check for posts when popup icon is clicked
        </Label>
      </Box>
      <Label htmlFor="commentSort" sx={{ mt: '12px' }}>
        Sort comments by (default):{' '}
      </Label>
      <Select
        name="commentSort"
        sx={{ width: '100%' }}
        value={commentSort}
        onChange={(e) => {
          setCommentSort(e.target.value)
          chrome.storage.local.set({ commentSort: e.target.value })
        }}
      >
        <option value="best">Best</option>
        <option value="top">Top</option>
        <option value="new">New</option>
        <option value="old">Old</option>
        <option value="controversial">Controversial</option>
      </Select>
      <Flex
        sx={{
          justifyContent: 'center',
          gap: '12px',
          my: '20px',
        }}
      >
        <Link href="mailto:contact@voat.me" rel="noreferrer" variant="nav">
          Contact
        </Link>
        <Link
          href="https://github.com/z0ccc/voat-extension"
          target="_blank"
          rel="noreferrer"
          variant="nav"
        >
          GitHub
        </Link>
        <Link
          href="https://www.reddit.com/r/voatme"
          target="_blank"
          rel="noreferrer"
          variant="nav"
        >
          Reddit
        </Link>
      </Flex>
    </Box>
  )
}

export default Options
