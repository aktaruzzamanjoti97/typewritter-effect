'use client';

import { javascript } from '@codemirror/lang-javascript';
import { sublime } from '@uiw/codemirror-theme-sublime';
import CodeMirror from '@uiw/react-codemirror';
import { Fragment, useEffect, useState } from 'react';
import { staticCode } from './sampleCode';
import styles from './styles.module.css';

const TextGenerate = () => {
	const [code, setCode] = useState('// Click Start Generating to see magic');
	const [started, setStarted] = useState<boolean>(false);
	let timer: ReturnType<typeof setInterval> | undefined;

	const handleGenerate = () => {
		setStarted(true);
	};

	const handleReset = () => {
		setStarted(false);
		setCode('// Click Start Generating to see magic');
		clearInterval(timer);
	};

	const startCreating = () => {
		let i = 0;
		let generateCode = '';

		timer = setInterval(() => {
			if (i === staticCode.length - 1) clearInterval(timer);
			generateCode += staticCode[i];
			setCode(generateCode);
			i++;
		}, 10);
	};

	useEffect(() => {
		if (started) {
			startCreating();
		}
		return () => {
			clearInterval(timer);
		};
	}, [started]);

	return (
		<Fragment>
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={handleGenerate}>
					Start Generating
				</button>
				<button className={styles.button} onClick={handleReset}>
					Reset
				</button>
			</div>
			<div className={styles.container}>
				<CodeMirror
					value={code}
					height='300px'
					className={styles.codeMirror}
					extensions={[javascript({ jsx: true })]}
					theme={sublime}
				/>
			</div>
		</Fragment>
	);
};

export default TextGenerate;
