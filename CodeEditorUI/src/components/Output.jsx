import {Box, Text, Button, useToast, Icon} from "@chakra-ui/react";
import {executeAnalyzer, executeCode} from "../api.js";
import {useEffect, useState} from "react";

const Output = ({editorRef, outputRef, getOutput}) => {
    const toast = useToast();
    const [output, setOutput] = useState(outputRef); // Inicializa con el valor recibido de props
    const [isLoading, setIsLoading] = useState(false);

    // Actualiza el output cuando cambian las props
    useEffect(() => {
        setOutput(outputRef);
    }, [outputRef]);

    const runCode = async () => {
        if (!editorRef) {
            toast({
                title: 'Editor not initialized',
                description: 'The editor is not ready yet...',
                status: "error",
                duration: 6000
            });
            return;
        }

        const sourceCode = editorRef.getValue();
        if (!sourceCode) return;

        try {
            setIsLoading(true);
            //const {run: result} = await executeCode('javascript', sourceCode);
            const {run: result} = await executeAnalyzer(sourceCode)
            console.log(result.output, result)
            setOutput(result.output.split("\n"));
            getOutput(result.output.split("\n"));
        } catch (e) {
            console.log('Error code: ' + e.message);
            toast({
                title: 'An error occurred',
                description: e.message || 'Unable to run code',
                status: "error",
                duration: 6000
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box w="40%" py={5}>
            <Text mb={2} fontSize='lg'>Output</Text>
            <Button
                variant='outline'
                mb={4}
                isLoading={isLoading}
                onClick={runCode}
                borderColor={'rgba(99,179,237,1)'}
                color={'rgba(99,179,237,1)'}
            >
                Run Code
            </Button>
            <Box
                height='85vh'
                p={2}
                border='1px solid'
                borderRadius={4}
                borderColor='#333'
            >
                {output && output.length > 0
                    ? output.map((line, i) => <Text color={'white'} fontWeight={'semibold'} fontStyle={'italic'} key={i}>{line}</Text>)
                    : 'Click "Run Code" to see the output'}
            </Box>
        </Box>
    );
};

export default Output;
