import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const TagFilter = ({ 
  selectedTag, 
  onTagChange, 
  availableTags = [],
  placeholder = "Filter by tag"
}) => {
  return (
    <Select value={selectedTag || "all"} onValueChange={onTagChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Tags</SelectItem>
        {availableTags.map((tag) => (
          <SelectItem key={tag} value={tag}>
            {tag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TagFilter;
