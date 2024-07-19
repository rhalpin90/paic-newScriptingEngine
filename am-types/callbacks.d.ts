export interface Callback {}

export type ScriptedCallbacksWrapper = {
    /**
     * Getter for ChoiceCallback type callbacks.
     *
     * @return List of the ChoiceCallbacks selected indexes.
     */
    getChoiceCallbacks: () => number[][];

    /**
     * Getter for ConfirmationCallback type callbacks.
     *
     * @return List of the ConfirmationCallbacks selected values.
     */
    getConfirmationCallbacks: () => number[];

    /**
     * Getter for NameCallback type callbacks.
     *
     * @return List of the NameCallbacks return values.
     */
    getNameCallbacks: () => string[];

    /**
     * Getter for PasswordCallback type callbacks.
     *
     * @return List of the PasswordCallbacks return values.
     */
    getPasswordCallbacks: () => string[];
    
    /**
     * Returns false if no callbacks arrived in AM.
     * @return boolean value of any callbacks stored.
     */
    isEmpty: () => boolean;
}

export type ScriptedCallbacksBuilder = {
    /**
     * Construct and save to the list of callbacks a `ChoiceCallback` with a prompt,
     * a list of choices, a default choice, and a boolean specifying
     * whether or not multiple selections from the list of choices are allowed.
     *
     *
     * @param prompt the prompt used to describe the list of choices.
     *
     * @param choices the list of choices.
     *
     * @param defaultChoice the choice to be used as the default choice
     *                  when the list of choices are displayed.  This value
     *                  is represented as an index into the
     *                  `choices` array.
     *
     * @param multipleSelectionsAllowed boolean specifying whether or
     *                  not multiple selections can be made from the
     *                  list of choices.
     *
     * @exception IllegalArgumentException if `prompt` is null,
     *                  if `prompt` has a length of 0,
     *                  if `choices` is null,
     *                  if `choices` has a length of 0,
     *                  if any element from `choices` is null,
     *                  if any element from `choices`
     *                  has a length of 0 or if `defaultChoice`
     *                  does not fall within the array boundaries of
     *                  `choices`.
     */
    choiceCallback: (prompt: string, choices: string[], defaultChoice: number, multipleSelectionsAllowed: boolean) => void;

    confirmationCallback: (...args: any[]) => void

    /**
     * Construct and save to the list of callbacks a `NameCallback` with a prompt
     * and default name.
     *
     * @param prompt the prompt used to request the information.
     *
     * @param defaultName the name to be used as the default name displayed
     *                  with the prompt.
     *
     * @exception IllegalArgumentException if `prompt` is null,
     *                  if `prompt` has a length of 0,
     *                  if `defaultName` is null,
     *                  or if `defaultName` has a length of 0.
     */
    nameCallback: (prompt: string, defaultName?: string) => void;

    /**
     * Construct and save to the list of callbacks a `PasswordCallback` with a prompt
     * and a boolean specifying whether the password should be displayed
     * as it is being typed.
     *
     * @param prompt the prompt used to request the password.
     *
     * @param echoOn true if the password should be displayed
     *                  as it is being typed.
     *
     * @exception IllegalArgumentException if `prompt` is null or
     *                  if `prompt` has a length of 0.
     */
    passwordCallback: (prompt: string, echoOn: boolean) => void;
    
    /**
     * Construct and save to the list of callbacks a TextOutputCallback with a message type and message
     * to be displayed.
     *
     * @param messageType the message type (`INFORMATION = 0`,
     *                  `WARNING = 1` or `ERROR = 2`).
     *
     * @param message the message to be displayed.
     *
     * @exception IllegalArgumentException if `messageType`
     *                  is not either `INFORMATION`,
     *                  `WARNING` or `ERROR`,
     *                  if `message` is null,
     *                  or if `message` has a length of 0.
     */
    textOutputCallback: (messageType: 0 | 1 | 2, message: string) => void;

    /**
     * Construct and save to the list of callbacks it as an INFORMATION TextOutputCallback.
     *
     * @param message The script which will be inserted into the page receiving this callback
     */
    scriptTextOutputCallback: (message: string) => void;
}
