import { Button } from "../button"
import Input from "../input"
import SearchIcon from "../icon/SearchIcon"
import DropDownIcon from "../icon/DropDownIcon"
import { Text } from "../text"

const SearchBar: React.FC = () => {
  return (
    <div className="flex flex-row gap-x-6 items-center justify-content w-full">
      <div className="flex flex-row w-full">
        <Input
          position="start"
          placeholder="Venue Type"
          icon={
            <SearchIcon />
          } 
          className="w-[60%]"/>
        <div className="w-px bg-additional-secondary" />
        <div className="flex flex-row justify-between py-3 px-6 bg-additional items-center w-[20%]">
          <Text variant="h6" color="black-secondary">Date</Text>
          <DropDownIcon />
        </div>
        <div className="w-px bg-additional-secondary" />
        <div className="flex flex-row justify-between py-3 px-6 bg-additional items-center rounded-br-2xl w-[20%]">
          <Text variant="h6" color="black-secondary">Location</Text>
          <DropDownIcon />
        </div>
      </div>
      <Button text="Search" />
    </div>
  )
}

export default SearchBar