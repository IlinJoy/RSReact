import { type ChangeEvent, Component, type FormEvent } from 'react';

import { SpriteIcon } from '../SpriteIcon/SpriteIcon';
import styles from './SearchBar.module.scss';

type SearchBarProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

type SearchBarState = {
  inputValue: string;
  isDirty: boolean;
  initialValue: string;
};

export class SearchBar extends Component<SearchBarProps> {
  state: SearchBarState = {
    inputValue: this.props.searchTerm,
    isDirty: false,
    initialValue: this.props.searchTerm,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    this.setState({
      inputValue,
      isDirty: inputValue !== this.state.initialValue,
    });
  };

  handleSubmit = (event: FormEvent, isResetting?: boolean) => {
    event.preventDefault();

    const searchTerm = isResetting ? '' : this.state.inputValue.trim();
    this.setState({ initialValue: searchTerm, inputValue: searchTerm });
    this.props.onSearch(searchTerm);
  };

  render() {
    const { inputValue, initialValue } = this.state;
    const isDirty = inputValue !== initialValue;

    return (
      <div className={styles.searchBar}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              name="search"
              type="text"
              placeholder="Looking for..."
              value={inputValue}
              onChange={this.handleChange}
              className={styles.input}
            />
            {inputValue && (
              <button
                type="reset"
                onClick={(event) => this.handleSubmit(event, true)}
                className={styles.resetButton}
              >
                <SpriteIcon id="close" size={16} />
              </button>
            )}
          </div>

          <button type="submit" disabled={!isDirty} className={styles.button}>
            Search
          </button>
        </form>
      </div>
    );
  }
}
