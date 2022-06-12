import { connectRelevantSort } from 'react-instantsearch-dom';

const RelevantSort = ({
  isVirtualReplica,
  isRelevantSorted,
  buttonTextComponent: ButtonTextComponent,
  refine,
  // Optional parameter
  textComponent: TextComponent,
}) => {
  console.log("Testing");
  console.log({ isVirtualReplica, isRelevantSorted })

  return (
    !isVirtualReplica ? null : (
      <div>
        <div>
          {TextComponent && <TextComponent isRelevantSorted={isRelevantSorted} />}
        </div>
        <button
          onClick={() => refine(isRelevantSorted ? 0 : undefined)}
        >
          <ButtonTextComponent isRelevantSorted={isRelevantSorted} />
        </button>
      </div>
    )
  )
}

export const CustomRelevantSort = connectRelevantSort(RelevantSort);