import { Component } from 'react';
import logo from '/logo.png';
import Search from './Search';

interface HeaderProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { input: props.searchTerm };
  }

  render() {
    return (
      <header className="bg-gray-800 text-gray shadow-md py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <a
              href="/"
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img
                src={logo}
                alt="Логотип"
                className="h-12 w-auto object-contain"
              />
            </a>
          </div>
          <div className="w-full md:w-auto flex-grow max-w-2xl">
            <Search
              searchTerm={this.props.searchTerm}
              onSearch={this.props.onSearch}
            />
          </div>
        </div>
      </header>
    );
  }
}
