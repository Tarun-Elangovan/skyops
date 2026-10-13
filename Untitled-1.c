
#include <stdio.h>
int main() {
    int n,m,i,j;
    int block[20],process[20],b[20],alloc[20];
    printf("Enter number of memory blocks: ");
    scanf("%d",&n);
    printf("Enter memory block sizes:\n");
    for(i=0;i<n;i++)
        scanf("%d",&block[i]);
    printf("Enter number of processes: ");
    scanf("%d",&m);
    printf("Enter process sizes:\n");
    for(i=0;i<m;i++)
        scanf("%d",&process[i]);
    for(i=0;i<n;i++)
        b[i]=block[i];
    printf("\nFirst Fit:\n");
    for(i=0;i<m;i++) {
        alloc[i]=-1;
        for(j=0;j<n;j++) {
            if(b[j]>=process[i]) {
                alloc[i]=j;
                b[j]-=process[i];
                break;
            }
        }
    }
    for(i=0;i<m;i++) {
        if(alloc[i]!=-1)
            printf("Process %d -> Block %d\n",i+1,alloc[i]+1);
        else
            printf("Process %d -> Not Allocated\n",i+1);
    }
    for(i=0;i<n;i++)
        b[i]=block[i];
    printf("\nBest Fit:\n");
    for(i=0;i<m;i++) {
        alloc[i]=-1;
        int best=-1;
        for(j=0;j<n;j++) {
            if(b[j]>=process[i] && (best==-1 || b[j]<b[best]))
                best=j;
        }
        if(best!=-1) {
            alloc[i]=best;
            b[best]-=process[i];
        }
    }
    for(i=0;i<m;i++) {
        if(alloc[i]!=-1)
            printf("Process %d -> Block %d\n",i+1,alloc[i]+1);
        else
            printf("Process %d -> Not Allocated\n",i+1);
    }
    for(i=0;i<n;i++)
        b[i]=block[i];
    printf("\nWorst Fit:\n");
    for(i=0;i<m;i++) {
        alloc[i]=-1;
        int worst=-1;
        for(j=0;j<n;j++) {
            if(b[j]>=process[i] && (worst==-1 || b[j]>b[worst]))
                worst=j;
        }
        if(worst!=-1) {
            alloc[i]=worst;
            b[worst]-=process[i];
        }
    }
    for(i=0;i<m;i++) {
        if(alloc[i]!=-1)
            printf("Process %d -> Block %d\n",i+1,alloc[i]+1);
        else
            printf("Process %d -> Not Allocated\n",i+1);
    }
    return 0;
}