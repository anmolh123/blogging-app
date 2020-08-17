export const buildMatchingTable = (keywords)=>{
    let goto = {
        0:{}
    }
    let nodes=0;
    let terminalNodes={};
    let failure = {};

    keywords.forEach(word => {
        
        let curr = 0;
        for( let i=0; i<word.length; i++){
            let ch = word[i];
            if(goto[curr][ch]){
                curr = goto[curr][ch];
            }else{
                nodes++;
                goto[curr][ch] = nodes;
                goto[nodes]={};
                curr = nodes;
            }
        }
      terminalNodes[curr]=word;
    });

    let queue = [];
    failure[0]=0;

    for( let ch in goto[0]){
        let state = goto[0][ch];
        failure[state]=0;
        queue.push(state);
    }

    while(queue.length){

        let prev = queue.shift();

        for(let ch in goto[prev]){
            
            let state = failure[prev];
            
            while( state!==0 && !goto[state][ch]){
                state = failure[state];
            }

            let curr = goto[prev][ch];

            if(goto[state][ch]){
                failure[curr] = goto[state][ch];
            }else{
                failure[curr] = 0;
            }

            queue.push(curr);
        }
    }


  return { goto : goto, terminalNodes : terminalNodes, failure: failure};
}

export const ahoCorasick = (text,automata)=>{

    const { goto, terminalNodes, failure} = automata;
    let curr = 0;

    for(let i=0; i<text.length; i++){
        let ch = text[i];

        if( goto[curr][ch] ){
            curr = goto[curr][ch];
        }else{

            while( curr!==0 && !goto[curr][ch]){
                curr = failure[curr];
            }
            let next = goto[curr][ch];
            curr = next ? next : 0;
        }

        if(terminalNodes[curr]){
            return true;
        }
    }

    return false;
}