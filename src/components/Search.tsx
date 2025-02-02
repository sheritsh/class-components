import { Component, ChangeEvent, KeyboardEvent } from 'react';

interface SearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

interface SearchState {
  input: string;
}

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { input: props.searchTerm };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleSearch = () => {
    this.props.onSearch(this.state.input);
  };

  render() {
    return (
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Поиск..."
          className="bg-gray-700 text-white rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-400
                   transition-all duration-200 flex-grow
                   placeholder-gray-400 max-w-[180px] sm:max-w-[100%]"
        />
        <button
          onClick={this.handleSearch}
          className="hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white
                   font-semibold py-2 px-6 rounded-lg
                   transition-colors duration-200 transform hover:scale-105
                   whitespace-nowrap"
        >
          Поиск
        </button>
      </div>
    );
  }
}
