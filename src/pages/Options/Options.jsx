/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx, Box, Label, Flex, Link, Select, Checkbox } from 'theme-ui'
import { setIcon } from '../../utils/setIcon'
import { isFirefox } from '../../utils/constants'

const Options = () => {
  const [sidePanelDefault, setSidePanelDefault] = useState(false)
  const [hidePosts, setHidePosts] = useState(false)
  const [noPopupCheck, setNoPopupCheck] = useState(false)
  const [youtubeDefault, setYoutubeDefault] = useState(false)
  const [theme, setTheme] = useState('default')
  const [sortType, setSortType] = useState('best')

  useEffect(() => {
    chrome.storage.local.get(
      [
        'sidePanelDefault',
        'hidePosts',
        'noPopupCheck',
        'youtubeDefault',
        'theme',
        'sortType',
      ],
      (storage) => {
        storage.sidePanelDefault !== undefined &&
          setSidePanelDefault(storage.sidePanelDefault)
        storage.hidePosts !== undefined && setHidePosts(storage.hidePosts)
        storage.noPopupCheck !== undefined &&
          setNoPopupCheck(storage.noPopupCheck)
        storage.youtubeDefault !== undefined &&
          setYoutubeDefault(storage.youtubeDefault)
        storage.theme !== undefined && setTheme(storage.theme)
        storage.sortType !== undefined && setSortType(storage.sortType)
      }
    )
  }, [])

  return (
    <Box sx={{ mx: '20px', mt: '12px' }}>
      <Box sx={{ mb: '12px' }}>
        {isFirefox ? null : (
          <Label>
            <Checkbox
              checked={sidePanelDefault}
              onChange={(e) => {
                setSidePanelDefault(e.target.checked)
                chrome.storage.local.set({ sidePanelDefault: e.target.checked })
                chrome.sidePanel
                  .setPanelBehavior({
                    openPanelOnActionClick: e.target.checked,
                  })
                  .catch((error) => console.error(error))
              }}
            />
            Toolbar icon opens side panel instead of popup
          </Label>
        )}
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
          <Checkbox
            checked={youtubeDefault}
            onChange={(e) => {
              setYoutubeDefault(e.target.checked)
              chrome.storage.local.set({ youtubeDefault: e.target.checked })
            }}
          />
          Show YouTube comments by default
        </Label>
        <Label>
          <Checkbox
            checked={noPopupCheck}
            onChange={(e) => {
              setNoPopupCheck(e.target.checked)
              chrome.storage.local.set({ noPopupCheck: e.target.checked })
              setIcon('../icon48.png')
            }}
          />
          Only check for posts when popup icon is clicked
        </Label>
      </Box>

      <Label htmlFor="theme" sx={{ mt: '12px' }}>
        Extension Theme:
      </Label>
      <Select
        name="theme"
        sx={{ width: '100%' }}
        value={theme}
        onChange={(e) => {
          setTheme(e.target.value)
          chrome.storage.local.set({ theme: e.target.value })
        }}
      >
        <option value="default">Default</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </Select>
      <Label htmlFor="sortType" sx={{ mt: '12px' }}>
        Sort comments by (default):
      </Label>
      <Select
        name="sortType"
        sx={{ width: '100%' }}
        value={sortType}
        onChange={(e) => {
          setSortType(e.target.value)
          chrome.storage.local.set({ sortType: e.target.value })
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
        <Link
          href="https://github.com/z0ccc/comet"
          target="_blank"
          rel="noreferrer"
          variant="nav"
        >
          GitHub
        </Link>
        <Link
          href="https://www.reddit.com/r/CometExtension"
          target="_blank"
          rel="noreferrer"
          variant="nav"
        >
          Subreddit
        </Link>
      </Flex>
    </Box>
  )
}

export default Options
