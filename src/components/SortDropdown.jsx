/** @jsx jsx */
import { jsx, Box, Select } from 'theme-ui'

const SortDropdown = ({ sortType, setSortType }) => {
  return (
    <Box sx={{ mt: '14px' }}>
      <Select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="best">Best</option>
        <option value="top">Top</option>
        <option value="new">New</option>
        <option value="old">Old</option>
        <option value="controversial">Controversial</option>
      </Select>
    </Box>
  )
}

export default SortDropdown
